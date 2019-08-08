import { Upload } from './upload.model';

export class TrashUpload {
  constructor(
    public upload: Upload,
    public uid: string
  ) { }
}
