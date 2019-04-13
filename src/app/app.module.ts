import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, PipeTransform, Pipe } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import {
    MatToolbarModule, MatTableModule, MatPaginatorModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatPaginatorIntl,
    MatDialogModule, MatDatepickerModule, MatAutocompleteModule, MatDateFormats, MAT_DATE_LOCALE,
    MAT_DATE_FORMATS, MatNativeDateModule, MatSelectModule,
} from '@angular/material';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { CouriersComponent } from './pages/couriers/couriers.component';
import { LeadsComponent } from './pages/leads/leads.component';
import { RecipientsComponent } from './pages/recipients/recipients.component';
import { SendersComponent } from './pages/senders/senders.component';
import { TransportComponent } from './pages/transport/transport.component';
import { EditorComponent } from './pages/editor/editor.component';
import { Observable } from 'rxjs';
import { DatepickerTimestampComponent } from './controls/datepicker-timestamp/datepicker-timestamp.component';
import { FsLookupPickerComponent } from './controls/fs-lookup-picker/fs-lookup-picker.component';

export class CustomPaginator extends MatPaginatorIntl {
    constructor() {
        super();
        this.itemsPerPageLabel = 'Записей на страницу';
        this.getRangeLabel = (page, pageSize, length) => {
            if (length === 0 || pageSize === 0) {
                return `0 из ${length}`;
            }

            length = Math.max(length, 0);
            const startIndex = page * pageSize;
            const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
            return `${startIndex + 1} - ${endIndex} из ${length}`;
        };
    }
}

@Pipe({
    name: 'refDoc'
})
export class RefDocPipe implements PipeTransform {

    constructor(private db: AngularFirestore) { }

    transform(value: any): Observable<any> {
        return this.db.doc(value.path).valueChanges();
    }
}

const MY_FORMATS: MatDateFormats = {
    parse: {
        dateInput: 'DD.MM.YYYY',
    },
    display: {
        dateInput: 'DD.MM.YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM Y',
    }
};

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        CouriersComponent,
        LeadsComponent,
        RecipientsComponent,
        SendersComponent,
        TransportComponent,
        EditorComponent,
        RefDocPipe,
        DatepickerTimestampComponent,
        FsLookupPickerComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        MatToolbarModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatDatepickerModule,
        MatAutocompleteModule,
        MatNativeDateModule,
        MatSelectModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
    ],
    providers: [
        { provide: MatPaginatorIntl, useClass: CustomPaginator },
        { provide: MAT_DATE_LOCALE, useValue: 'ru' },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        EditorComponent,
    ]
})
export class AppModule { }
