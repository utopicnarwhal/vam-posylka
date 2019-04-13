import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Courier } from '../../models/courier';

@Injectable({
  providedIn: 'root'
})
export class CourierService {
  courierCollection: AngularFirestoreCollection<Courier>;
  couriers: Observable<Courier[]>;

  constructor(private db: AngularFirestore) {
    this.courierCollection = this.db.collection<Courier>('couriers');
    this.couriers = this.courierCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Courier;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
    );
  }

  public getCouriers() {
    return this.couriers;
  }

  public addCourier(courier: Courier) {
    this.courierCollection.add(courier);
  }

  public updateCourier(courier: Courier) {
    this.db.doc('couriers/' + courier.id).update(courier);
  }

  public deleteCourier(courier: Courier) {
    this.db.doc('couriers/' + courier.id).delete();
  }
}
