import { Component, OnInit } from '@angular/core';
import { Courier } from 'src/app/models/courier';
import { CourierService } from 'src/app/services/data_services/courier.service';
import { Translator } from 'src/app/utils/translator';
import { MatDialog } from '@angular/material';
import { EditorComponent } from '../editor/editor.component';

@Component({
    selector: 'app-couriers',
    templateUrl: './couriers.component.html',
    styleUrls: ['./couriers.component.css']
})
export class CouriersComponent implements OnInit {
    couriers: Courier[];

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
        'mobilephone'
    ];

    constructor(
        private courierService: CourierService,
        private dialog: MatDialog
    ) {
        this.courierService.getCouriers().subscribe((couriers) => {
            return this.couriers = couriers;
        });
    }

    ngOnInit() {
    }

    translateTableHeader(engTitle: string) {
        return Translator.translateTableHeaders(engTitle);
    }

    openEditor(courier: Courier = null) {
        this.dialog.open(EditorComponent, { data: { values: courier, type: 'Courier' } });
    }
}
