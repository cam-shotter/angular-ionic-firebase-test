import { Component, Input, OnInit } from '@angular/core';
import { Entry } from '../entry.class';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() entry: Entry;

  constructor() {}

  ngOnInit() {}

}
