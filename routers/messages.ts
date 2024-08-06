import {MessageWithoutDatetime} from '../types';
import express from 'express';
import fileDb from '../fileDb';

const messagesRouter = express.Router();

messagesRouter.get('/', async (_, res) => {
  const messages = await fileDb.getItems();

  res.send(messages);
});

messagesRouter.post('/', async (req, res) => {
  if (req.body.message !== undefined && req.body.message !== '') {
    const message: MessageWithoutDatetime = {
      message: req.body.message,
    };

    const saveMessage = await fileDb.addMessage(message);

    res.send(saveMessage);
  } else {
    res.send('Invalid request 404!');
  }
});

export default messagesRouter;