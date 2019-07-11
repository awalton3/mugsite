import { Timestamp } from 'rxjs/internal/types';

export class Upload {
  constructor(
    public userFrom: string,
    public userTo: string,
    public subject: string,
    public assignment: string,
    public comments: string,
    public attachments: string[],
    public creationDate: {
      day: number,
      month: number
    },
    public timestamp: Timestamp<string>,
    public id: string
  ) { }
}
