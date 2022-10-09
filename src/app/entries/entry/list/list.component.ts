import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Labels } from '@Shared/enums/labels';
import { EntriesService } from 'app/entries/entries.service';
import { EntryInterface } from '../entry.class';
import { ViewComponent } from '../view/view.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  @Input() entry: EntryInterface;

  labelsEnum = Labels;

  constructor(
    private entriesService: EntriesService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController
  ) {}

  editEntry(entry) {
    console.log('edit: ', entry);
  }

  deleteEntry(entry) {
    this.presentActionSheet(entry);
  }

  selectEntry(entry: EntryInterface) {
    this.openModal(entry);
  }

  private async openModal(entry: EntryInterface) {
    const modal = await this.modalCtrl.create({
      component: ViewComponent,
      componentProps: {
        entry: entry
      }
    });
    modal.present();
  }

  private async presentActionSheet(entry) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Are you sure you want to delete this entry?',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          data: {
            action: 'delete',
          },
          handler: () => {
            this.entriesService.deleteEntry(entry);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();
  }
}
