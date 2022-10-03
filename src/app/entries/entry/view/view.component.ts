import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EntryInterface } from '../entry.class';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  entry: EntryInterface;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    console.log('the entry: string: ', this.entry);

  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(null, 'confirm');
  }

}
