import { Component } from '@angular/core';
import { Icons } from '@Shared/enums/icons';
import { Page } from '@Shared/interfaces/page';

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
