export interface Courier {
    id?: string;
    firstname?: string;
    lastname?: string;
    middlename?: string;
    passport_number?: string;
    birthdate?: firebase.firestore.Timestamp;
    employment_date?: firebase.firestore.Timestamp;
    the_beginning_of_the_working_day?: string;
    end_of_work_day?: string;
    city?: string;
    street?: string;
    house?: number;
    appartment?: number;
    mobilephone?: number;
}
