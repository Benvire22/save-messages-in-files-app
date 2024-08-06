import express from 'express';
import fileDb from '../fileDb';
import {MessageWithoutDatetime} from '../types';

const messagesRouter = express.Router();

messagesRouter.get('/', async (req, res) => {
  const messages = await fileDb.getItems();
  res.send(messages);
});

messagesRouter.post('/', async (req, res) => {
  if (req.body.message) {
    const message: MessageWithoutDatetime = {
      message: req.body.message,
    };

    const saveMessage = await fileDb.addMessage(message);
    res.send(saveMessage);
  } else {
    res.send('404');
  }
});

export default messagesRouter;