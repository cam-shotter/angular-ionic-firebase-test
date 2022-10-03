import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { EntryInterface } from './entry/entry.class';
import { catchError, Observable, throwError, shareReplay } from 'rxjs';

import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class EntriesService {
  constructor(private firestore: AngularFirestore) {}

  entries$ = this.firestore.collection<EntryInterface>('entries').valueChanges({idField: 'id'})
    .pipe(
      shareReplay(1),
      catchError(err => this.handleError(err))
    );

  saveEntry(entryDetails: EntryInterface) {
    this.firestore.collection<EntryInterface>('entries')
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

  deleteEntry(entryDetails: EntryInterface) {
    this.firestore.collection('entries')
      .doc(entryDetails.id)
      .delete()
      .then(res => {
        console.log('entry deleted: ', entryDetails.id, ': ', res);
      })
      .catch(err => {
        this.handleError(err)
      })
  }

  editEntry(entryDetails: EntryInterface) {
    this.saveNewRevision();
  }

  private saveNewRevision() {

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
