import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Sender } from '../../models/sender';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SenderService {
    senderCollection: AngularFirestoreCollection<Sender>;
    senders: Observable<Sender[]>;

    constructor(private db: AngularFirestore) {
      this.senderCollection = this.db.collection<Sender>('senders', ref => ref.orderBy('lastname'));
      this.senders = this.senderCollection.snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data() as Sender;
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
      );
    }

    public getSenders() {
      return this.senders;
    }

    public addSender(sender: Sender) {
      this.senderCollection.add(sender);
    }
}
