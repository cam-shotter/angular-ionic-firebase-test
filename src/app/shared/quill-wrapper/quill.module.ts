import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillComponent } from './quill.component';
import { QuillModule } from 'ngx-quill';
import { IonicModule } from '@ionic/angular';

const toolbarConfig = [
  ['bold', 'italic', 'underline'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{ header: 1 }, { header: 2 }],               // custom button values
  [{ list: 'ordered'}, { list: 'bullet' }],
  [{ indent: '-1'}, { indent: '+1' }],          // outdent/indent

  [{ color: [] }],          // dropdown with defaults from theme
  [{ align: [] }],

  ['link', 'image', 'video']                         // link and image, video
];

@NgModule({
  declarations: [QuillComponent],
  imports: [
    CommonModule,
    IonicModule,
    QuillModule.forRoot({
      format: 'text',
      modules: {
        toolbar: toolbarConfig
      },
      theme: 'snow'
    }),
  ],
  exports: [QuillComponent]
})
export class QuillWrapperModule { }
