export class EventItem {
  constructor(
    public title: string,
    public description: string,
    public dateFrom: {day: string, month: string},
    public dateTo: {day: string, month: string},
    public location: string,
    public time: string,
    public contact: string,
    public instructions: string, 
    public attachments: string[]
  ) { }

}
