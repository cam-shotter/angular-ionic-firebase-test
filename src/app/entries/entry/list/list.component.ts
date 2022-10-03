import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Labels } from '@Shared/enums/labels';
import { Entry, EntryInterface } from '../entry.class';
import { ViewComponent } from '../view/view.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() entry: Entry;

  labelsEnum = Labels;

  constructor(private modalCtrl: ModalController) {
  }

  ngOnInit() {}

  editEntry(evt) {
    console.log('edit: ', evt);
    // this.openModal(entry);
  }

  deleteEntry(evt) {
    console.log('delete: ', evt);
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

}
