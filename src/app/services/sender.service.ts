import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Sender } from '../models/sender';

@Injectable({
  providedIn: 'root'
})
export class SenderService {
  senderCollection: AngularFirestoreCollection<Sender>;
  senders: Observable<Sender[]>;

  constructor(private db: AngularFirestore) {
    // this.leads = db.collection('leads').valueChanges();
    this.senderCollection = this.db.collection<Sender>('senders');
    this.senders = this.senderCollection.valueChanges();
  }

  public getLeads() {
    return this.senders;
  }

  public addLead(sender: Sender) {
    this.senderCollection.add(sender);
  }
}
