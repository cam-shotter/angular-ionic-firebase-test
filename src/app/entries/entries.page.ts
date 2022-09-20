import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, EMPTY, Observable, of, Subject } from 'rxjs';
import { EntriesService } from './entries.service';
import { Entry } from './entry/entry.class';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.page.html',
  styleUrls: ['./entries.page.scss'],
})
export class EntriesPage implements OnInit {
  private errorMessageSubject = new Subject<Entry[]>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  public id: string;
  public creatingNewEntry: boolean = false;
  public selectedEntry: Entry;

  constructor(private activatedRoute: ActivatedRoute, private entriesService: EntriesService) {}
  entries$ = this.entriesService.entries$
    .pipe(
      catchError((err) => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      })
    )

  createNewEntry(): void {
    this.selectedEntry = Entry.createNew();
  }

  selectEntry(entry: Entry) {
    this.selectedEntry = entry.clone();
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('id: ', this.id);

  }

}
