const fs = require("fs");
const split = require("split2");
const through2 = require("through2"); //returns a stream that expects and returns objects
const parse = require("csv-parse");
const ndjson = require("ndjson");

const connectToDb = require("./db/config");
const Answer = require("./db/models/answers");

let row = 1;
const giveTransformStream = (columns, transformData) =>
  through2.obj(function(chunk, enc, callback) {
    let stringChunk = chunk.toString();
    parse(
      stringChunk,
      {
        columns,
        bom: true,
        skip_empty_lines: true,
        skip_lines_with_empty_values: true,
        skip_lines_with_error: true,
        trim: true
      },
      (err, parse) => {
        let [parsed] = parse;
        if (row === 1) {
          row++;
          return callback();
        }
        const newStructure = transformData(parsed);
        this.push(newStructure);
        row++;
        callback();
      }
    );
  });

const givePrepareBatchStream = () => {
  let batch = [];
  return through2.obj(function(chunkThatisAnObject, enc, callback) {
    batch.push(chunkThatisAnObject);
    if (batch.length === 500) {
      this.push(batch);
      batch = [];
    }
    callback();
  });
};

const waitFor100ms = () =>
  new Promise(resolve => {
    setTimeout(resolve, 100);
  });

const writeBatchToDb = through2.obj(async function(
  chunkThatisABatch,
  enc,
  callback
) {
  try {
    await Answer.insertMany(chunkThatisABatch, {
      rawResult: true,
      ordered: false
    });
    await waitFor100ms();
    callback();
  } catch (e) {
    console.log(e);
    callback();
  }
});

async function csvToNdjson({ filepath, newFilepath, columns, transformData }) {
  await connectToDb();
  console.log("connected to mongo");

  const readStream = fs.createReadStream(filepath);
  const writeStream = fs.createWriteStream(newFilepath);
  const prepareBatchStream = givePrepareBatchStream();
  readStream
    .pipe(split())
    .pipe(giveTransformStream(columns, transformData))
    .pipe(prepareBatchStream)
    .pipe(writeBatchToDb);
}

module.exports = csvToNdjson;

// 1. read data in chunks: readStream
// 2. split chunks based on NLD (gives out indv rows)
// 3. parse individual rows of data

// WHY STREAMS?
//1.instead of reading a huge (2gb) data (which is also not possible as nodejs would crash),
//streams break that data up into many smaller parts (ex: 10,000 10mb chunks....customizable)
//2.streams ensure that only a small size chunk is waiting in RAM before/while processing
//the rest of the data is maintained on the disk and not taking up space in memory

// 10KB

// FIRSTNAME,LASTNAME,AGE
// john,doe,23
// tushar, s, 24
// x, y, 12

// john,doe,23
// tushar,

// ## First Chunk
// 1 - there's  a new line char after 3
// 2 - take that line and pass it to next writeStream ("john,doe,23")
// 3 - store thre rest of it("tushar,")

//  s, 24
// x, y, 12

// ## Second Chunk
// 1 - there's a new line after 4
// 2 - whatever data we have from prev chunk add that to this line and pass on to the next
// ("tushar,"+ "s, 24") = ("tushar, s, 24")
// 3 - store the rest of it ("")

// function transformDuplexStream(rowChunk) {
//   const parsedObject = parseCSRow(rowChunk);

//   const newObj = {
//     initialname: parsedObject.FIRNAME
//   };

//   return newObj;
// }
