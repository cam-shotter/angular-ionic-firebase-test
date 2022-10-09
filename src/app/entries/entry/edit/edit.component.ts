import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Labels } from '@Shared/enums/labels';
import { EntriesService } from 'app/entries/entries.service';
import { Timestamp } from 'firebase/firestore';
import { map } from 'rxjs';
import { CreateService } from '../create/create.service';
import { EntryInterface } from '../entry.class';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent {
  entry: EntryInterface;

  constructor(
    private modalCtrl: ModalController,
    private entriesService: EntriesService,
    private createService: CreateService
  ) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(null, 'confirm');
  }

  saveEntry() {
    this.saveCurrentEntryAsRevision(this.entry);
    this.saveNewEdit();

  }

  private saveCurrentEntryAsRevision(entry: EntryInterface) {
    this.entriesService.saveCurrentEntryAsRevision(entry);
  }

  private saveNewEdit() {
    this.createService.setTitle(this.entry.name);
    this.createService.setCreatedBy(this.entry.createdBy);
    this.createService.setLabels([Labels.important]);
    this.createService.entry$.pipe(
      map((data) => {
        const entryToSave: EntryInterface = {
          id: this.entry.id,
          name: data.name,
          lastSaved: Timestamp.now(),
          content: data.content,
          createdBy: data.createdBy,
          labels: [Labels.important],
        }

        this.entriesService.saveNewEdit(entryToSave);
      })
    ).subscribe();
  }
}
