import { Labels } from "@Shared/enums/labels";

export interface EntryInterface {
  id: string;
  name: string;
  lastSaved: Date;
  content: string;
  createdBy: string;
  labels: Labels[];
  revisionHistory?: Entry[];
}

export class Entry {
  public id: string;
  public name: string;
  public lastSaved: Date;
  public content: string;
  public createdBy: string;
  public labels: Labels[];
  public revisionHistory?: Entry[];

  constructor(
    id = '',
    name = '',
    lastSaved = new Date(),
    content = '',
    createdBy = 'Cam',
    labels = [],
    revisionHistory = undefined
  ) {}

  static createNew(): Entry {
    return new Entry();
  }

  clone(): Entry {
    return new Entry(
      this.id,
      this.name,
      this.lastSaved,
      this.content,
      this.createdBy,
      this.labels,
      this.revisionHistory,
    )
  }
}
