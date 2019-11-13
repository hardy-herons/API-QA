const Question = require('../db/models/questions.js');
const Answers = require('../db/models/answers.js');

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

const addQData = async ({
  product_id,
  body,
  date,
  asker_email,
  asker_name
}) => {
  let id = (await Question.count()) + 1;
  let newQuestion = await new Question({
    product_id,
    body,
    date,
    asker_email,
    asker_name,
    reported: 0,
    helpful: 0,
    id: id
  });
  console.log({ newQuestion });
  return newQuestion.save((err, question) => {
    if (err) {
      console.log('error saving new question model', err);
    } else {
      console.log(`posted ${question}`);
    }
  });
};

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

module.exports = {
  questionData,
  answerData,
  aHelpfulData,
  qHelpfulData,
  reportAData,
  reportQData,
  addQData
};
