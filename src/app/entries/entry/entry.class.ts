export enum EntryStateEnum {
  new = 'new',
  saved = 'saved'
}

export enum Label {
  important = 'important',
}

export interface EntryInterface {
  id: string,
  name: string,
  dateSaved: Date,
  content: string,
  labels?: Label[],
  state: EntryStateEnum,
  revisionHistory?: EntryInterface[]
}

export class Entry {
  public entry: EntryInterface;

  constructor() {
    this.entry.id = '',
    this.entry.name = '',
    this.entry.dateSaved = new Date(),
    this.entry.content = '',
    this.entry.labels = undefined,
    this.entry.state = EntryStateEnum.new,
    this.entry.revisionHistory = undefined
  }

  clone(): Entry {
    return new Entry(
      this.entry.id,
      this.entry.name,
      this.entry.dateSaved,
      this.entry.content,
      this.entry.labels,
      this.entry.state,
      this.entry.revisionHistory,
    )
  }
}
