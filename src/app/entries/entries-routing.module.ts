import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntriesPage } from './entries.page';
import { CardComponent } from './entry/card/card.component';
import { CreateComponent } from './entry/create/create.component';
import { ListComponent } from './entry/list/list.component';

const routes: Routes = [
  {
    path: '',
    component: EntriesPage
  },
  {
    path: 'Create',
    component: CreateComponent
  },
  {
    path: 'All',
    component: ListComponent
  },
  {
    path: 'Recent',
    component: CardComponent
  },
  {
    path: 'Archived',
    component: ListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntriesPageRoutingModule {}
