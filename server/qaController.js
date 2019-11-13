// let Questions = require('../db/models/questions');
let {
  questionData,
  answerData,
  aHelpfulData,
  qHelpfulData,
  reportAData,
  reportQData,
  addQData
} = require('./qaModels');

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

const qHelpfulController = (req, res) => {
  qHelpfulData(req.params.question_id).exec((err, data) => {
    if (err) {
      console.log(
        `error makring question id ${req.params.question_id} helpful`,
        err
      );
      res.sendStatus(500);
    } else {
      res.send(
        `this question has been marked helpful ${data.helpfulness} times`
      );
    }
  });
};

const qReportedController = (req, res) => {
  reportQData(req.params.question_id).exec((err, data) => {
    if (err) {
      console.log(`error reporting question id ${req.params.question_id}`, err);
      res.sendStatus(500);
    } else {
      res.send(`this question has been reported`);
    }
  });
};

const addQController = (req, res) => {
  addQData({
    product_id: req.params.product_id,
    body: req.body,
    asker_email: req.body.email,
    asker_name: req.body.name,
    date: new Date()
  }).exec((err, data) => {
    console.log({ data });
    if (err) {
      console.log(`error posting question`, err);
      res.status(500).send('error posting question', err);
    } else {
      console.log({ data });
      res.send(`successfully posted ${data.name}'s question`, data);
    }
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
    let answers = { question: req.params.question_id, results: results };
    res.send(JSON.stringify(answers));
  });
};

const aHelpfulController = (req, res) => {
  aHelpfulData(req.params.answer_id).exec((err, data) => {
    if (err) {
      console.log(
        `error makring answer id ${req.params.answer_id} helpful`,
        err
      );
      res.sendStatus(500);
    } else {
      res.send(`this answer has been marked helpful ${data.helpfulness} times`);
    }
  });
};

const aReportedController = (req, res) => {
  reportAData(req.params.answer_id).exec((err, data) => {
    if (err) {
      console.log(`error reporting answer id ${req.params.answer_id}`, err);
      res.sendStatus(500);
    } else {
      res.send(`this answer has been reported`);
    }
  });
};

module.exports = {
  qController,
  aController,
  qHelpfulController,
  aHelpfulController,
  aReportedController,
  qReportedController,
  addQController
};
