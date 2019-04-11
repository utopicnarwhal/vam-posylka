import { DocumentReference } from '@angular/fire/firestore';

export interface Lead {
    id?: string;
    recipient?: DocumentReference;
    sender?: DocumentReference;
    order_date?: Date;
    delivery_date?: Date;
    price?: number;
    courier?: DocumentReference;
    transport?: DocumentReference;
}
