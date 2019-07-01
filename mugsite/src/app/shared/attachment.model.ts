export class Attachment {
  constructor(
    public fileObj: File,
    public nameRef: string,
    public shouldDelete: boolean,
    public shouldAdd: boolean,
    public inDataStorage: boolean
  ) { }
}
