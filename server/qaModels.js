const Question = require('../db/models/questions.js');
const Answers = require('../db/models/answers.js');

const questionData = product_id => {
  return Question.find({ product_id });
};

const answerData = question_id => {
  return Answers.find({ question_id });
};

module.exports = { questionData, answerData };
