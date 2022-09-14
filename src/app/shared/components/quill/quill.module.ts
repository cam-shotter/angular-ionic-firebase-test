import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillComponent } from './quill.component';
import { QuillModule } from 'ngx-quill';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [QuillComponent],
  imports: [
    CommonModule,
    IonicModule,
    QuillModule.forRoot({
      modules: {
        syntax: true
      }
    }),
  ],
  exports: [QuillComponent]
})
export class QuillWrapperModule { }
