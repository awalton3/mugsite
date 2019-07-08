export class User {
  constructor(
    public name: string,
    public photoUrl: string,
    public email: string,
    public type: string,
    public uid: string,
    public isNewUser: boolean,
    public prefs: {
      AutoHourLog: boolean,
      InboxNotif: boolean,
      HourLogNotif: boolean
    }
  ) { }
}
