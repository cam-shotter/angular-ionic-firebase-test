import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillComponent } from './quill.component';
import { QuillModule } from 'ngx-quill';
import { IonicModule } from '@ionic/angular';

const toolbarConfig = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{ header: 1 }, { header: 2 }],               // custom button values
  [{ list: 'ordered'}, { list: 'bullet' }],
  [{ script: 'sub'}, { script: 'super' }],      // superscript/subscript
  [{ indent: '-1'}, { indent: '+1' }],          // outdent/indent
  [{ direction: 'rtl' }],                         // text direction

  [{ size: ['huge', 'large', false, 'small'] }],  // custom dropdown
  [{ header: [1, 2, false] }],

  [{ color: [] }, { background: [] }],          // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ['clean'],                                         // remove formatting button

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
