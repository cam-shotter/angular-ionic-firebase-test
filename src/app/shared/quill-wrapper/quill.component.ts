import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Labels } from '@Shared/enums/labels';
import { EntriesService } from 'app/entries/entries.service';
import { EntryInterface } from 'app/entries/entry/entry.class';
import { Timestamp } from 'firebase/firestore';
import { ContentChange, QuillEditorComponent } from 'ngx-quill';
import { debounceTime, distinctUntilChanged, map, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-quill',
  templateUrl: './quill.component.html',
  styleUrls: ['./quill.component.scss'],
})
export class QuillComponent implements OnInit {
  @Input() entryTitle: string = 'New entry';

  @ViewChild('editor', {
    static: true
  }) editor: QuillEditorComponent

  private contentHTML: string;

  editorContent$: Observable<string>;

  constructor(private entriesService: EntriesService) {}

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
    console.log(this.entryTitle);

    const entryToSave: EntryInterface = {
      id: '',
      name: this.entryTitle,
      lastSaved: Timestamp.now(),
      content: this.contentHTML,
      createdBy: 'Cam',
      labels: [Labels.important],
    }

    console.log(entryToSave);


    this.entriesService.saveEntry(entryToSave);
  }
}
