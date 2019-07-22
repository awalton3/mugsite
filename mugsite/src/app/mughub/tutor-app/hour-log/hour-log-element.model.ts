import { User } from '../../auth/user.model';

export class HourLogElement {
  constructor(
    public connection: User,
    public date: Date,
    public startTime: string,
    public endTime: string
  ) {}
}
