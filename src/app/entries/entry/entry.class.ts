export enum EntryStateEnum {
  new = 'new',
  saved = 'saved'
}

export enum Label {
  important = 'important',
}

export class Entry {
  public id: string;
  public name: string;
  public dateSaved: Date;
  public content: string;
  public labels: Label[];
  public state: EntryStateEnum;
  public revisionHistory?: Entry[];

  constructor(
    id = '',
    name = '',
    dateSaved = new Date(),
    content = '',
    labels = [],
    state = EntryStateEnum.new,
    revisionHistory = undefined
  ) {}

  static createNew(): Entry {
    return new Entry();
  }

  clone(): Entry {
    return new Entry(
      this.id,
      this.name,
      this.dateSaved,
      this.content,
      this.labels,
      this.state,
      this.revisionHistory,
    )
  }
}
