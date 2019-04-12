import { Component, OnInit, Output, Input, forwardRef, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgModel, ControlValueAccessor } from '@angular/forms';

@Component({
    selector: 'app-datepicker-timestamp',
    templateUrl: './datepicker-timestamp.component.html',
    styleUrls: ['./datepicker-timestamp.component.css'],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DatepickerTimestampComponent), multi: true },
    ]
})
export class DatepickerTimestampComponent implements ControlValueAccessor, OnInit {
    @Input() label: string;
    @Output() change = new EventEmitter<firebase.firestore.Timestamp>();

    public dateValue: Date;

    constructor() { }

    ngOnInit() {
    }

    writeValue(val: Date): void {
    }

    registerOnChange(fn: any): void {}

    registerOnTouched(fn: any): void {}

    setDisabledState?(isDisabled: boolean): void {}
}
