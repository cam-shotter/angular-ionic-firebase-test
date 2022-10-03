import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, EMPTY, Observable, of, Subject, tap } from 'rxjs';
import { EntriesService } from './entries.service';
import { Entry, EntryInterface } from './entry/entry.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IonModal, ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { ViewComponent } from './entry/view/view.component';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.page.html',
  styleUrls: ['./entries.page.scss'],
})
export class EntriesPage implements OnInit {
  private errorMessageSubject = new Subject<Entry[]>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  public id: string;
  public creatingNewEntry: boolean = false;
  public selectedEntry: EntryInterface;

  constructor(
    private activatedRoute: ActivatedRoute,
    private entriesService: EntriesService,
    private modalCtrl: ModalController
  ) {}

  entries$ = this.entriesService.entries$
    .pipe(
      catchError((err) => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      })
    )

  createNewEntry(): void {
    this.selectedEntry = Entry.createNew();
  }

  selectEntry(entry: EntryInterface) {
    this.selectedEntry = entry;
    console.log('show: ', this.selectedEntry);
    this.openModal();
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ViewComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    // if (role === 'confirm') {
    //   this.message = `Hello, ${data}!`;
    // }
  }

  ngOnInit() {
    const getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.id = getId;
    if (getId === "Create") {
      this.creatingNewEntry = true;
    }
  }
}
