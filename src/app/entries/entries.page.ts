import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Entry } from './entry/entry.class';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.page.html',
  styleUrls: ['./entries.page.scss'],
})
export class EntriesPage implements OnInit {
  public entries: string;
  public creatingNewEntry: boolean = true;
  public selectedEntry: Entry;

  constructor(private activatedRoute: ActivatedRoute) {}

  createNewEntry() {
    this.selectedEntry = Entry.createNew();
  }

  selectEntry(entry: Entry) {
    this.selectedEntry = entry.clone();
  }

  ngOnInit() {
    this.entries = this.activatedRoute.snapshot.paramMap.get('id');
  }

}
