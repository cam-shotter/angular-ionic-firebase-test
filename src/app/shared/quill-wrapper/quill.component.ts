import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ContentChange, QuillEditorComponent } from 'ngx-quill';
import { BehaviorSubject, debounceTime, distinctUntilChanged, map, Observable, Subject, Subscription, takeUntil, tap } from 'rxjs';

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

  constructor(private firestore: AngularFirestore) {}

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
    this.firestore.collection('entries')
      .add({content: this.contentHTML})
      .then(res => {
        console.log('add response: ', res);
      })
      .catch(e => {
        console.log('error: ', e);
      })
  }
}
