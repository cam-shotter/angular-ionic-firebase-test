import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Labels } from '@Shared/enums/labels';
import { EntriesService } from 'app/entries/entries.service';
import { Timestamp } from 'firebase/firestore';
import { map, Observable, tap } from 'rxjs';
import { EntryInterface } from '../entry.class';
import { CreateService } from './create.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent {
  title = new FormControl<string>('');
  createdBy = new FormControl<string>('');

  entryTitle$: Observable<string> = this.title.valueChanges;
  entryCreatedBy$: Observable<string> = this.createdBy.valueChanges;

  constructor(
    private entriesService: EntriesService,
    private createService: CreateService
  ) {}


  saveEntry() {
    this.createService.setTitle(this.title.value);
    this.createService.setCreatedBy(this.createdBy.value);
    this.createService.setLabels([Labels.important]);
    this.createService.entry$.pipe(
      map((data) => {
        const entryToSave: EntryInterface = {
          id: '',
          name: data.name,
          lastSaved: Timestamp.now(),
          content: data.content,
          createdBy: data.createdBy,
          labels: [Labels.important],
        }

        this.entriesService.saveEntry(entryToSave);
      })
    ).subscribe();
  }
}
