import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Lead } from '../models/lead';

@Injectable({
  providedIn: 'root'
})
export class LeadService {
  leadCollection: AngularFirestoreCollection<Lead>;
  leads: Observable<Lead[]>;

  constructor(private db: AngularFirestore) {
    // this.leads = db.collection('leads').valueChanges();
    this.leadCollection = this.db.collection<Lead>('leads');
    this.leads = this.leadCollection.valueChanges();
  }

  public getLeads() {
    return this.leads;
  }

  public addLead(lead: Lead) {
    this.leadCollection.add(lead);
  }
}
