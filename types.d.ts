export interface Message {
  message: string;
  datetime: string;
}

export type MessageWithoutDatetime = Omit<Message, 'datetime'>;