import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Create', url: '/entries/Create', icon: 'add-circle' },
    { title: 'All Entries', url: '/entries/All', icon: 'list' },
    { title: 'Recent', url: '/entries/Recent', icon: 'calendar' },
    { title: 'Archived', url: '/entries/Archived', icon: 'archive' },
  ];
  public labels = ['Important', 'Personal', 'Notes', 'Work', 'Reminders'];
  constructor() {}
}
