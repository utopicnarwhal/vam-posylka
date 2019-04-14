import { Component, OnInit, OnDestroy } from '@angular/core';
import { Courier } from 'src/app/models/courier';
import { CourierService } from 'src/app/services/data_services/courier.service';
import { Translator } from 'src/app/utils/translator';
import { MatDialog } from '@angular/material';
import { EditorComponent } from '../editor/editor.component';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
    selector: 'app-couriers',
    templateUrl: './couriers.component.html',
    styleUrls: ['./couriers.component.css']
})
export class CouriersComponent implements OnInit, OnDestroy {
    couriers: Courier[];
    subscriptions: Subscription[] = [];

    displayedColumns: string[] = [
        'firstname',
        'lastname',
        'middlename',
        'passport_number',
        'birthdate',
        'employment_date',
        'the_beginning_of_the_working_day',
        'end_of_work_day',
        'city',
        'street',
        'house',
        'appartment',
        'mobilephone',
        'edit',
    ];

    constructor(
        private courierService: CourierService,
        private dialog: MatDialog,
        public afAuth: AngularFireAuth
    ) { }

    ngOnInit() {
        this.subscriptions.push(
            this.courierService.getCouriers().subscribe((couriers) => {
                return this.couriers = couriers;
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => {
            subscription.unsubscribe();
        });
    }

    translateTableHeader(engTitle: string) {
        return Translator.translateTableHeaders(engTitle);
    }

    openEditor(courier: Courier = null) {
        this.subscriptions.push(
            this.dialog.open(EditorComponent, { data: { values: courier, type: 'Courier' } }).afterClosed().subscribe((response) => {
                if (!response || !response.data) {
                    return;
                }
                if (response.delete) {
                    this.courierService.deleteCourier(response.data);
                    return;
                }
                if (response.data.id) {
                    this.courierService.updateCourier(response.data);
                    return;
                }
                this.courierService.addCourier(response.data);
            })
        );
    }
}
