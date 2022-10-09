import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntriesPageRoutingModule } from './entries-routing.module';

import { EntriesPage } from './entries.page';
import { QuillWrapperModule } from '../shared/quill-wrapper/quill.module';
import { CardComponent } from './entry/card/card.component';
import { ListComponent } from './entry/list/list.component';
import { CreateComponent } from './entry/create/create.component';
import { ViewComponent } from './entry/view/view.component';
import { EditComponent } from './entry/edit/edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntriesPageRoutingModule,
    QuillWrapperModule,
    ReactiveFormsModule,
  ],
  declarations: [
    EntriesPage,
    CardComponent,
    ListComponent,
    CreateComponent,
    ViewComponent,
    EditComponent,
  ]
})
export class EntriesPageModule {}
