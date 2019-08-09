import { User } from 'src/app/mughub/auth/user.model';
import { Timestamp } from 'rxjs';

export class Upload {
  constructor(
    public sender: User,
    public recipients: User[],
    public subject: string,
    public body: string,
    public attachments: { displayName: string, storageRef: string }[],
    public creationDate: {
      day: number,
      month: number
    },
    public timestamp: Timestamp<string>,
    public id: string,
    public unread: boolean
  ) { }
}
