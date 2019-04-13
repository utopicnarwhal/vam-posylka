import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Recipient } from '../../models/recipient';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipientService {
  recipientCollection: AngularFirestoreCollection<Recipient>;
  recipients: Observable<Recipient[]>;

  constructor(private db: AngularFirestore) {
    this.recipientCollection = this.db.collection<Recipient>('recipients');
    this.recipients = this.recipientCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Recipient;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  public getRecipients() {
    return this.recipients;
  }

  public addRecipient(recipient: Recipient) {
    this.recipientCollection.add(recipient);
  }

  public updateRecipient(recipient: Recipient) {
    this.db.doc('recipients/' + recipient.id).update(recipient);
  }

  public deleteRecipient(recipient: Recipient) {
    this.db.doc('recipients/' + recipient.id).delete();
  }
}
