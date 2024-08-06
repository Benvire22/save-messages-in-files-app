import {promises as fs} from 'fs';
import {Message, MessageWithoutDatetime} from './types';

const path = './messages';
let data: Message[] = [];

const fileDb = {
  async init() {
    try {
      const files = await fs.readdir(path);

      if (files.length === 0) {
        return data = [];
      }

      data = await Promise.all(files.map(async (file): Promise<Message> => {
        const data = await fs.readFile(`${path}/${file}`);
        return JSON.parse(data.toString());
      }));

    } catch (e) {
      console.error(e);
      data = [];
    }
  },
  async getItems() {
    return data.slice(-5)
  },
  async addMessage(item: MessageWithoutDatetime) {
    const message: Message = {
      message: item.message,
      datetime: Date(),
    }

    await fs.writeFile(`${path}/${message.datetime}`, JSON.stringify(message));
    await this.init();
    return message;
  },
};

export default fileDb;