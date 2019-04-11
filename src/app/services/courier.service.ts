import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Courier } from '../models/courier';

@Injectable({
  providedIn: 'root'
})
export class CourierService {
  courierCollection: AngularFirestoreCollection<Courier>;
  couriers: Observable<Courier[]>;

  constructor(private db: AngularFirestore) {
    // this.leads = db.collection('leads').valueChanges();
    this.courierCollection = this.db.collection<Courier>('couriers');
    this.couriers = this.courierCollection.valueChanges();
  }

  public getCouriers() {
    return this.couriers;
  }

  public addCourier(courier: Courier) {
    this.courierCollection.add(courier);
  }
}
