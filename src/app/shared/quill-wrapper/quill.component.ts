import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Labels } from '@Shared/enums/labels';
import { EntriesService } from 'app/entries/entries.service';
import { EntryInterface } from 'app/entries/entry/entry.class';
import { ContentChange, QuillEditorComponent } from 'ngx-quill';
import { debounceTime, distinctUntilChanged, map, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-quill',
  templateUrl: './quill.component.html',
  styleUrls: ['./quill.component.scss'],
})
export class QuillComponent implements OnInit {
  @Input() editorPlaceholder = 'Placeholder';

  @ViewChild('editor', {
    static: true
  }) editor: QuillEditorComponent

  private contentHTML: string;

  editorContent$: Observable<string>;

  constructor(private firestore: AngularFirestore, private entriesService: EntriesService) {}

  ngOnInit() {
    this.editorContent$ = this.editor
      .onContentChanged
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        tap(data => this.contentHTML = data.html),
        map((data: ContentChange) => {
          return data.html
        })
      )
  }

  saveEntry() {
    const entryToSave: EntryInterface = {
      id: '',
      name: 'Test name',
      lastSaved: new Date(),
      content: this.contentHTML,
      createdBy: 'Cam',
      labels: [Labels.important],
    }

    this.entriesService.saveEntry(entryToSave);
  }
}
