let {
  questionData,
  answerData,
  aHelpfulData,
  qHelpfulData,
  reportAData,
  reportQData,
  addQData,
  addAData,
  answerPhotoData,
  postQuestionData
} = require("./qaModels");

const qController = (req, res) => {
  questionData(req.params.product_id).exec(async (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }

    let QwoA = data.filter(question => {
      return question["reported"] === 0;
    });

    //executing queries (promises) in parallel
    let answers = QwoA.map((ques, index) => {
      return answerData(ques.id).then(answers => ({
        answers,
        quesIndex: index
      }));
    });

    // promise all ensures all promises inside the answers array are resolved
    answers = await Promise.all(answers);

    answers.forEach(({ answers, quesIndex }) => {
      // we need to get the question element for this answer
      QwoA[quesIndex].answer = answers;
    });

    res.json({
      product_id: req.params.product_id,
      results: QwoA
    });
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

// const addQController = (req, res) => {
//   addQData({
//     product_id: req.params.product_id,
//     body: req.body,
//     asker_email: req.body.email,
//     asker_name: req.body.name,
//     date: new Date()
//   })
//     .then(data => {
//       console.log({ dataInQController: data });
//       res.status(200).send(`successfully posted ${data.name}'s question`, data);
//     })
//     .catch(err => {
//       console.log(`error posting question`, err);
//       res.status(500).send("error posting question", err);
//     });
// };

const addQController = async (req, res) => {
  await addQData(req.params.product_id, req.body).exec((err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    res.sendStatus(201);
  });
};

const aController = (req, res) => {
  answerData(req.params.question_id).exec((err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    let results = data.filter(answer => {
      return answer["reported"] === 0;
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

const answerPhotoController = (req, res) => {
  answerPhotoData(req.params.answer_id)
    .then(results => {
      console.log("successful query for answer photos", { results });
      res.send(results);
    })
    .catch(err => {
      console.log("could not query for photos", err);
      res.sendStatus(500);
    });
};

const addAController = async (req, res) => {
  await addAData(req.params.question_id, req.body).exec((err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    res.sendStatus(201);
  });
};

module.exports = {
  qController,
  aController,
  qHelpfulController,
  aHelpfulController,
  aReportedController,
  qReportedController,
  addQController,
  answerPhotoController,
  addAController
};
