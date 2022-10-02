import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Entry, EntryInterface } from './entry/entry.class';
import { tap, catchError, Observable, throwError, shareReplay } from 'rxjs';

import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class EntriesService {
  constructor(private firestore: AngularFirestore) {}

  entries$ = this.firestore.collection<Entry>('entries').valueChanges()
    .pipe(
      shareReplay(1),
      catchError(err => this.handleError(err))
    );

  saveEntry(entryDetails: EntryInterface) {
    this.firestore.collection('entries')
      .add({
        content: entryDetails.content,
        createdBy: entryDetails.createdBy,
        id: entryDetails.id,
        labels: entryDetails.labels,
        lastSaved: entryDetails.lastSaved,
        name: entryDetails.name,
      })
      .then(res => {
        console.log('add response: ', res);
      })
      .catch(err => {
        this.handleError(err)
      })
  }

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
