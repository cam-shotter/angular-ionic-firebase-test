import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntriesPageRoutingModule } from './entries-routing.module';

import { EntriesPage } from './entries.page';
import { QuillWrapperModule } from '../shared/quill-wrapper/quill.module';
import { CardComponent } from './entry/card/card.component';
import { ListComponent } from './entry/list/list.component';
import { CreateComponent } from './entry/create/create.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntriesPageRoutingModule,
    QuillWrapperModule
  ],
  declarations: [EntriesPage, CardComponent, ListComponent, CreateComponent]
})
export class EntriesPageModule {}
