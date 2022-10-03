import { Labels } from "@Shared/enums/labels";
import { Timestamp } from "firebase/firestore";

export interface EntryInterface {
  id: string;
  name: string;
  lastSaved: Timestamp;
  content: string;
  createdBy: string;
  labels: Labels[];
  revisionHistory?: Entry[];
}

export class Entry {
  public id: string;
  public name: string;
  public lastSaved: Timestamp;
  public content: string;
  public createdBy: string;
  public labels: Labels[];
  public revisionHistory?: Entry[];

  constructor(
    id = '',
    name = '',
    lastSaved = Timestamp.now(),
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
