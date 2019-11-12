const express = require('express');
const QARouter = express.Router();
const { qController, aController } = require('./qaController.js');

QARouter.get('/:product_id', qController);
QARouter.get('/:question_id/answers', aController);

module.exports = QARouter;
