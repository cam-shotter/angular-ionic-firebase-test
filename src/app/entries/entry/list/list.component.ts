import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Labels } from '@Shared/enums/labels';
import { EntriesService } from 'app/entries/entries.service';
import { EntryInterface } from '../entry.class';
import { ViewComponent } from '../view/view.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() entry: EntryInterface;

  labelsEnum = Labels;

  constructor(
    private entriesService: EntriesService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController
  ) {}

  ngOnInit() {}

  editEntry(entry) {
    console.log('edit: ', entry);
    // this.openModal(entry);
  }

  deleteEntry(entry) {

    this.presentActionSheet(entry);
    // this.openModal(entry);
  }

  selectEntry(entry: EntryInterface) {
    this.openModal(entry);
  }

  async openModal(entry: EntryInterface) {
    const modal = await this.modalCtrl.create({
      component: ViewComponent,
      componentProps: {
        entry: entry
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    // if (role === 'confirm') {
    //   this.message = `Hello, ${data}!`;
    // }
  }

   async presentActionSheet(entry) {
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
