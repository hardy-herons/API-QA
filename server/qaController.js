// let Questions = require('../db/models/questions');
let { questionData, answerData } = require('./qaModels');

const qController = (req, res) => {
  questionData(req.params.product_id).exec((err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    let results = data.filter(question => {
      return question['reported'] === 0;
    });
    let questions = { product_id: req.params.product_id, results: results };
    res.send(JSON.stringify(questions));
  });
};

const aController = (req, res) => {
  answerData(req.params.question_id).exec((err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    let results = data.filter(answer => {
      return answer['reported'] === 0;
    });
    let answers = { question_id: req.params.question_id, results: results };
    res.send(JSON.stringify(answers));
  });
};

module.exports = { qController, aController };
