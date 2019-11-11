import { createReadStream, createWriteStream, readdirSync } from 'fs';
import split from 'split2';
import through2 from 'through2';
import parse from 'csv-parse';
import pump from 'pump';
import ndjson from 'ndjson';
import uniqid from 'uniqid';
import { CronJob } from 'cron';

const serialize = () => ndjson.serialize();
const source = (filename: string) => createReadStream(filename);
const output = (filename: string) => createWriteStream(filename);

const transformObjectStream = (context: any) => {
  //
  return through2.obj(async function(
    chunk: String,
    enc: String,
    callback: (err?: Error) => any
  ) {
    let stringChunk;
    try {
      stringChunk = chunk.toString();
    } catch (err) {
      stringChunk = null;
      console.error(
        `error transforming Object to string at line ${context.line} ${err}`
      );
      return callback();
    }
    parse(
      stringChunk,
      {
        bom: true,
        skip_empty_lines: true,
        skip_lines_with_empty_values: true,
        skip_lines_with_error: true,
        trim: true
      },
      async (err: Error, parsedString: string[]) => {
        if (err) {
          console.error(`transform Object error at line ${context.line}${err}`);
          return callback();
        }
        //decreases CPU usage from 100% to 20-25%
        if (context.line % 5000 === 0) {
          await delay(); //build this function below
        }
        try {
          const join = parsedString[0];
          if (!join || !Array.isArray(join)) {
            throw new Error(`Bad CSV Line at ${context.line}` )
          }
          const data = {

          }
        }
      }
    );
  });
};
