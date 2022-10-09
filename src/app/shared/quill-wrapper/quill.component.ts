import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { Labels } from '@Shared/enums/labels';
import { EntriesService } from 'app/entries/entries.service';
import { EntryInterface } from 'app/entries/entry/entry.class';
import { Timestamp } from 'firebase/firestore';
import { ContentChange, QuillEditorComponent } from 'ngx-quill';
import { BehaviorSubject, debounceTime, distinctUntilChanged, map, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-quill',
  templateUrl: './quill.component.html',
  styleUrls: ['./quill.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuillComponent {
  @Input() entryTitle: string = 'New entry';

  private contentHTMLSubject = new BehaviorSubject<string>('');
  editorContent$: Observable<string> = this.contentHTMLSubject.asObservable();

  constructor(private entriesService: EntriesService) {}

  changeContent(data: ContentChange) {
    debounceTime(400);
    distinctUntilChanged();
    this.contentHTMLSubject.next(data.html);
  }

  saveEntry() {
    const entryToSave: EntryInterface = {
      id: '',
      name: this.entryTitle,
      lastSaved: Timestamp.now(),
      content: this.contentHTMLSubject.getValue(),
      createdBy: 'Cam',
      labels: [Labels.important],
    }

    this.entriesService.saveEntry(entryToSave);
  }
}
