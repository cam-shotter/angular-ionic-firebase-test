import { Component, Input, OnInit } from '@angular/core';
import { Page } from '@Shared/interfaces/page';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() appPages: Page[] = [];
  @Input() labels: string[] = [];

  constructor() { }

  ngOnInit() {}

}
