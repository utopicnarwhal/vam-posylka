export interface Sender {
    id?: string;
    firstname?: string;
    lastname?: string;
    middlename?: string;
    birthdate?: firebase.firestore.Timestamp;
    postcode?: number;
    city?: string;
    street?: string;
    house?: number;
    appartment?: number;
    mobilephone?: number;
}
