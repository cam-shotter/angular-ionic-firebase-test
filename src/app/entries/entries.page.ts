import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.page.html',
  styleUrls: ['./entries.page.scss'],
})
export class EntriesPage implements OnInit {
  public entries: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.entries = this.activatedRoute.snapshot.paramMap.get('id');
  }

}
