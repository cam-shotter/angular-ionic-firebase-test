import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CreateService } from 'app/entries/entry/create/create.service';
import { ContentChange } from 'ngx-quill';
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

  constructor(private createService: CreateService) {}

  changeContent(data: ContentChange) {
    debounceTime(400);
    distinctUntilChanged();
    this.contentHTMLSubject.next(data.html);
    this.createService.setContent(data.html);
  }
}
