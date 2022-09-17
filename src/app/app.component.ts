import { Component } from '@angular/core';

export enum Icons {
  addCircle = 'add-circle',
  list = 'list',
  calendar = 'calendar',
  archive = 'archive'
}

export interface Page {
  title: string,
  url: string,
  icon: Icons
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages: Page[] = [
    { title: 'Create', url: '/entries/Create', icon: Icons.addCircle },
    { title: 'All Entries', url: '/entries/All', icon: Icons.list },
    { title: 'Recent', url: '/entries/Recent', icon: Icons.calendar },
    { title: 'Archived', url: '/entries/Archived', icon: Icons.archive },
  ];
  public labels: string[] = ['Important', 'Personal', 'Notes', 'Work', 'Reminders'];

  constructor() {}
}
