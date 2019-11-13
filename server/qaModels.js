const Question = require("../db/models/questions.js");
const Answers = require("../db/models/answers.js");
const Photos = require("../db/models/photos.js");

//question data
const questionData = product_id => {
  return Question.find({ product_id });
};

const qHelpfulData = question_id => {
  return Question.findOneAndUpdate(
    { id: question_id },
    { $inc: { helpfulness: 1 } }
  );
};

const reportQData = question_id => {
  return Question.findOneAndUpdate(
    { id: question_id },
    { $inc: { reported: 1 } }
  );
};

const addQData = (product_id, req_body) => {
  return Question.estimatedDocumentCount((err, count) => {
    if (err) {
      console.log(err);
    }
    let id = count + 1;
    let new_questions = {
      id: id,
      product_id: product_id,
      body: req_body.body,
      date: new Date(),
      asker_name: req_body.name,
      asker_email: req_body.email,
      helpfulness: 0,
      reported: 0
    };
    return Question.create(new_questions);
  });
};

// const addQData = async ({
//   product_id,
//   body,
//   date,
//   asker_email,
//   asker_name
// }) => {
//   let id = (await Question.count()) + 1;
//   let newQuestion = await new Question({
//     product_id,
//     body,
//     date,
//     asker_email,
//     asker_name,
//     reported: 0,
//     helpful: 0,
//     id: id
//   });

//   return newQuestion.save((err, question) => {
//     if (err) {
//       console.log("error saving new question model", err);
//     } else {
//       console.log(`posted ${question}`);
//       return json.Stringify(question);
//     }
//   });
// };

//answer data
const answerData = question_id => {
  return Answers.find({ question_id });
};

const aHelpfulData = answer_id => {
  return Answers.findOneAndUpdate(
    { answer_id: answer_id },
    { $inc: { helpfulness: 1 } }
  );
};

const reportAData = answer_id => {
  return Answers.findOneAndUpdate(
    { answer_id: answer_id },
    { $inc: { reported: 1 } }
  );
};

// const addAData = async ({
//   question_id,
//   body,
//   date,
//   answerer_email,
//   answerer_name
// }) => {
//   let id = (await Answers.count()) + 1;
//   let newAnswer = await new Question({
//     question_id,
//     body,
//     date,
//     answerer_email,
//     answerer_name,
//     reported: 0,
//     helpful: 0,
//     id: id
//   });
//   console.log({ newQuestion });
//   return newAnswer.save((err, answer) => {
//     if (err) {
//       console.log("error saving new answer model", err);
//     } else {
//       console.log(`posted ${answer}`);
//       return answer;
//     }
//   });
// };
const addAData = (question_id, req_body) => {
  return Answers.estimatedDocumentCount((err, count) => {
    if (err) {
      console.log(err);
    }
    let id = count + 1;
    let new_answer = {
      id: id,
      question_id: question_id,
      body: req_body.body,
      date: new Date(),
      answerer_name: req_body.name,
      answerer_email: req_body.email,
      helpfulness: 0,
      reported: 0
    };
    return Answers.create(new_answer);
  });
};

const answerPhotoData = id => {
  return Answers.aggregate([
    {
      $match: {
        id: id
      }
    },
    { $project: { answer_id: "$id" } },
    {
      $lookup: {
        from: "photos",
        let: { answer_id: "$answer_id" },
        pipeline: [{ $match: { $expr: { $eq: ["$id", "$$answer_id"] } } }],
        as: "answerPhotos"
      }
    }
  ]).then(docs => {
    console.log({ docs });
    return docs;
  });
};

module.exports = {
  questionData,
  answerData,
  aHelpfulData,
  qHelpfulData,
  reportAData,
  reportQData,
  addQData,
  addAData,
  answerPhotoData
};
