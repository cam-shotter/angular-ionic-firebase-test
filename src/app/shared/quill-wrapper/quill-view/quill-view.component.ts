import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-quill-view',
  templateUrl: './quill-view.component.html',
  styleUrls: ['./quill-view.component.scss'],
})
export class QuillViewComponent implements OnInit {
  @Input() content: string;

  constructor() { }

  ngOnInit() {}

}
