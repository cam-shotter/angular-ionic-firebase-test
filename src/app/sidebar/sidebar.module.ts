import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { SidebarComponent } from './sidebar.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [SidebarComponent],
  imports: [
    CommonModule,
    IonicModule,
    AppRoutingModule,
  ],
  exports: [SidebarComponent]
})
export class SidebarModule { }
