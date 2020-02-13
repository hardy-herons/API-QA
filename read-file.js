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
      async (err, parse) => {
        if (err) {
        }
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
