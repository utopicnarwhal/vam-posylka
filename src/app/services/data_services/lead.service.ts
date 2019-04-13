import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Lead } from '../../models/lead';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeadService {
  leadCollection: AngularFirestoreCollection<any>;
  leads: Observable<Lead[]>;

  constructor(private db: AngularFirestore) {
    this.leadCollection = this.db.collection<any>('leads');
    this.leads = this.leadCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Lead;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
    );
  }

  public getLeads() {
    return this.leads;
  }

  public addLead(lead: Lead) {
    this.leadCollection.add(lead);
  }

  public updateLead(lead: Lead) {
    this.db.doc('leads/' + lead.id).update(lead);
  }

  public deleteLead(lead: Lead) {
    this.db.doc('leads/' + lead.id).delete();
  }
}
