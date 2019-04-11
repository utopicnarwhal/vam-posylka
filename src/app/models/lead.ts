import { DocumentReference } from '@angular/fire/firestore';

export interface Lead {
    id?: string;
    recipient?: DocumentReference;
    sender?: DocumentReference;
    order_date?: firebase.firestore.Timestamp;
    delivery_date?: firebase.firestore.Timestamp;
    price?: number;
    courier?: DocumentReference;
    transport?: DocumentReference;
}
