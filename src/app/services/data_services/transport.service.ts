import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Transport } from '../../models/transport';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransportService {
  transportCollection: AngularFirestoreCollection<Transport>;
  transports: Observable<Transport[]>;

  constructor(private db: AngularFirestore) {
    this.transportCollection = this.db.collection<Transport>('transports');
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

  public updateTransport(transport: Transport) {
    this.db.doc('transports/' + transport.id).update(transport);
  }

  public deleteTransport(transport: Transport) {
    this.db.doc('transports/' + transport.id).delete();
  }
}
