import { Injectable } from '@angular/core';
import { Labels } from '@Shared/enums/labels';
import { BehaviorSubject, catchError, combineLatest, EMPTY, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateService {
  private titleSubject = new BehaviorSubject<string>('');
  title$ = this.titleSubject.asObservable();

  private createdBySubject = new BehaviorSubject<string>('');
  createdBy$ = this.createdBySubject.asObservable();

  private contentSubject = new BehaviorSubject<string>('');
  content$ = this.contentSubject.asObservable();

  private labelsSubject = new BehaviorSubject<Labels[]>([]);
  labels$ = this.labelsSubject.asObservable();

  constructor() { }

  setContent(content: string): void {
    this.contentSubject.next(content);
  }

  setTitle(title: string): void {
    this.titleSubject.next(title);
  }

  setCreatedBy(createdBy: string): void {
    this.createdBySubject.next(createdBy);
  }

  setLabels(labels: Labels[]): void {
    this.labelsSubject.next(labels);
  }

  entry$ = combineLatest([
      this.title$,
      this.createdBy$,
      this.content$,
      this.labels$,
  ]).pipe(
    map(([title, createdBy, content, labels]) => {
      return {
        name: title,
        content: content,
        createdBy: createdBy,
        labels: labels,
      }
    }),
    catchError(err => {
      this.handleError(err);
      return EMPTY;

    })
  )

  private handleError(err: Error) {
    console.log(err);
  }
}
