import {promises as fs} from 'fs';
import {Message} from './types';

const path = '../messages';
let data: Message[] = [];

const fileDb = {
  async init() {
    try {
      const files = await fs.readdir(path);
      for (const file of files) {
        const apiMessage = await fs.readFile(`${path}/${file}`);
        const message: Message = await JSON.parse(apiMessage.toString());
        data.push(message);
      }
    } catch (e) {
      console.error(e);
      data = [];
    }
  },
  async getItems() {
    return data.reverse().slice(0, 5);
  },
  async addMessage(message: Message) {
    await fs.writeFile(`${path}/${message.datetime}`, JSON.stringify(message));
  },
};

export default fileDb;