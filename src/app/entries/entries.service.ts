import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Entry } from './entry/entry.class';
import { tap, catchError, Observable, throwError, shareReplay } from 'rxjs';

import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class EntriesService {
  constructor(private firestore: AngularFirestore) {}

  entries$ = this.firestore.collection<Entry>('entries').valueChanges()
    .pipe(
      tap(data => console.log('Entries: ', JSON.stringify(data))),
      shareReplay(1),
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
