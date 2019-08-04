import { Timestamp } from 'rxjs/internal/types';
import { User } from 'src/app/mughub/auth/user.model';

export class Upload {
  constructor(
    public sender: User,
    public recipients: User[],
    public subject: string,
    public body: string,
    public attachments: string[],
    public creationDate: {
      day: number,
      month: number
    },
    public timestamp: Timestamp<string>,
    public id: string,
    public unread: boolean
  ) { }
}
