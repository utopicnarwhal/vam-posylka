import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { firestore } from 'firebase/app';

@Component({
    selector: 'app-datepicker-timestamp',
    templateUrl: './datepicker-timestamp.component.html',
    styleUrls: ['./datepicker-timestamp.component.css'],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DatepickerTimestampComponent), multi: true },
    ]
})
export class DatepickerTimestampComponent implements ControlValueAccessor, OnInit {

    @Input() id: string;
    @Input() label: string;

    public _onChange: (_: any) => void;
    public dateValue: Date;

    constructor() { }

    ngOnInit() {
    }

    writeValue(val: firestore.Timestamp): void {
        if (val) {
            try {
                this.dateValue = val.toDate();
            } catch {
                this.dateValue = new Date();
            }
        }
    }

    onChange($event) {
        try {
            if (!this.dateValue) {
                return;
            }
            var timestamp = new firestore.Timestamp(this.dateValue.getTime() / 1000, 0);
            this._onChange(timestamp);
        } catch (e) {
            console.log(e);
        }
    }

    registerOnChange(fn: (_: any) => void): void {
      this._onChange = fn;
    }

    registerOnTouched(fn: any): void {

    }
}
