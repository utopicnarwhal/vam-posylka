import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Transport } from '../../models/transport';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransportService {
    transportCollection: AngularFirestoreCollection<Transport>;
    transports: Observable<Transport[]>;

    constructor(private db: AngularFirestore) {
      this.transportCollection = this.db.collection<Transport>('transports', ref => ref.orderBy('registration_date'));
      this.transports = this.transportCollection.snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data() as Transport;
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
      );
    }

    public getTransports() {
      return this.transports;
    }

    public addTransport(transport: Transport) {
      this.transportCollection.add(transport);
    }
}
