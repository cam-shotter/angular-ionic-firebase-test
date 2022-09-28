import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ContentChange, QuillEditorComponent } from 'ngx-quill';
import { BehaviorSubject, debounceTime, distinctUntilChanged, Subject } from 'rxjs';

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

  contentSubject = new BehaviorSubject(this.editorPlaceholder);
  editorContent = this.contentSubject.asObservable();

  constructor() {}

  ngOnInit() {
    this.editor
      .onContentChanged
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
      )
      .subscribe((data: ContentChange) => {
        this.contentSubject.next(data.html)
      })
  }
}
