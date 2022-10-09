import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  title = new FormControl<string>('');

  entryTitle$: Observable<string> = this.title.valueChanges;

  constructor() {}

  ngOnInit() {

  }

}
