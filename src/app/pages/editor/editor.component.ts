import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
    public isNew = false;

    constructor(
        public dialogRef: MatDialogRef<EditorComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit() {
        if (this.data && this.data.type == null) {
            console.log('Нет данных или не указан тип');
            this.dialogRef.close(null);
            return;
        }
        if (!this.data.values && this.data.type != null) {
            this.data.values = {};
            this.isNew = true;
        }
    }

    submit() {
        this.dialogRef.close({data: this.data.values, delete: false});
    }

    delete() {
        this.dialogRef.close({data: this.data.values, delete: true});
    }
}
