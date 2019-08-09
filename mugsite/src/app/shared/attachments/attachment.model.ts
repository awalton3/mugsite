export class Attachment {
  constructor(
    public displayName: string,
    public storageRef: string,
    public file?: File
  ) { }
}
