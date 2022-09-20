import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EntryInterface } from './entry/entry.class';
import { tap, catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntriesService {
  private entriesUrl = 'api/entries';

  constructor(private http: HttpClient, ) { }

  entries$ = this.http.get<EntryInterface[]>(this.entriesUrl)
    .pipe(
      tap(data => console.log('Entries: ', JSON.stringify(data))),
      catchError(this.handleError)
    );

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    console.error(err);
    return throwError(() => errorMessage);
  }
}
