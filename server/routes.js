const express = require('express');
const QARouter = express.Router();
const {
  qController,
  aController,
  qHelpfulController,
  aHelpfulController,
  aReportedController,
  qReportedController,
  addQController
} = require('./qaController.js');

QARouter.get('/:product_id', qController);
QARouter.get('/:question_id/answers', aController);
QARouter.put('/question/:question_id/helpful', qHelpfulController);
QARouter.put('/answer/:answer_id/helpful', aHelpfulController);
QARouter.put('/question/:question_id/report', qReportedController);
QARouter.put('/answer/:answer_id/report', aReportedController);
QARouter.post('/:product_id', addQController);

module.exports = QARouter;
