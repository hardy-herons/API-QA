const path = require("path");

const readFile = require("../shop-box/read-file.js");

//answers
// readFile({
//   filepath: path.resolve(__dirname, '../../../../../../Downloads/answers.csv'),
//   newFilepath: path.resolve(__dirname, './answersCopy.csv'),
//   columns: [
//     'id',
//     'question_id',
//     'body',
//     'date_written',
//     'answerer_name',
//     'answerer_email',
//     'reported',
//     'helpful'
//   ],
//   transformData: parsed => ({
//     id: Number(parsed.id),
//     question_id: Number(parsed.question_id),
//     body: parsed.body,
//     date: new Date(parsed.date_written),
//     answerer_name: parsed.answerer_name,
//     answerer_email: parsed.answerer_email,
//     helpfulness: Number(parsed.helpful),
//     reported: Number(parsed.reported)
//   })
// });

// questions
readFile({
  filepath: path.resolve(
    __dirname,
    "../../../../../../Downloads/questions.csv"
  ),
  newFilepath: path.resolve(__dirname, "./questionsCopy.csv"),
  columns: [
    "id",
    "product_id",
    "body",
    "date_written",
    "asker_name",
    "asker_email",
    "reported",
    "helpful"
  ],
  transformData: parsed => ({
    id: Number(parsed.id),
    product_id: Number(parsed.product_id),
    body: parsed.body,
    date: new Date(parsed.date_written),
    asker_name: parsed.asker_name,
    asker_email: parsed.asker_email,
    helpfulness: Number(parsed.helpful),
    reported: Number(parsed.reported)
  })
});

//answerPhotos
readFile({
  filepath: path.resolve(
    __dirname,
    "../../../../../../Downloads/answers_photos.csv"
  ),
  newFilepath: path.resolve(__dirname, "./answersPhotosCopy.csv"),
  columns: ["id", "answer_id", "url"],
  transformData: parsed => ({
    id: Number(parsed.id),
    answer_id: Number(parsed.answer_id),
    url: parsed.body
  })
});
