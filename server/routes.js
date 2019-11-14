const express = require("express");
const QARouter = express.Router();
const {
  qController,
  aController,
  qHelpfulController,
  aHelpfulController,
  aReportedController,
  qReportedController,
  addQController,
  answerPhotoController,
  addAController
} = require("./qaController.js");

QARouter.get("/:product_id", qController);
QARouter.get("/:question_id/answers", aController);
QARouter.get("/:answer_id/answers/photos", answerPhotoController);
QARouter.put("/question/:question_id/helpful", qHelpfulController);
QARouter.put("/answer/:answer_id/helpful", aHelpfulController);
QARouter.put("/question/:question_id/report", qReportedController);
QARouter.put("/answer/:answer_id/report", aReportedController);
QARouter.post("/:product_id", addQController);
QARouter.post("/:question_id/answers", addAController);

module.exports = QARouter;
