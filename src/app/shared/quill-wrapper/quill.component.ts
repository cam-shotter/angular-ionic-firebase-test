import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ContentChange, QuillEditorComponent } from 'ngx-quill';
import { BehaviorSubject, debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-quill',
  templateUrl: './quill.component.html',
  styleUrls: ['./quill.component.scss'],
})
export class QuillComponent implements OnInit, OnDestroy {
  @Input() editorPlaceholder = 'Placeholder';

  @ViewChild('editor', {
    static: true
  }) editor: QuillEditorComponent

  private contentSubject = new BehaviorSubject(this.editorPlaceholder);
  editorContent$ = this.contentSubject.asObservable();

  private readonly destroy$ = new Subject<void>();

  constructor() {}

  ngOnInit() {
    this.editor
      .onContentChanged
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(400),
        distinctUntilChanged(),
      )
      .subscribe((data: ContentChange) => {
        this.contentSubject.next(data.html)
      })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
