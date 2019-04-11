export interface Transport {
    id?: string;
    transport_number?: string;
    model?: string;
    registration_date?: firebase.firestore.Timestamp;
    color?: string;
}
