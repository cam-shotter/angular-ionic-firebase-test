import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent {
  title = new FormControl<string>('');
  name = new FormControl<string>('');

  entryTitle$: Observable<string> = this.title.valueChanges;
  entryname$: Observable<string> = this.name.valueChanges;

  constructor() {}
}
