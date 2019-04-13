import { Component, OnInit, forwardRef, Input, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { DocumentReference, AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-fs-lookup-picker',
  templateUrl: './fs-lookup-picker.component.html',
  styleUrls: ['./fs-lookup-picker.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => FsLookupPickerComponent), multi: true },
  ]
})
export class FsLookupPickerComponent implements ControlValueAccessor, OnInit, OnDestroy {
  @Input() id: string;
  @Input() label: string;
  @Input() collectionName: string;

  public _onChange: (_: any) => void;
  public selectedLookup: any;
  public collectionStream: Observable<any[]>;

  private subscription: Subscription;

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    if (this.collectionName) {
      this.collectionStream = this.db.collection(this.collectionName).snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  writeValue(val: DocumentReference): void {
    if (val) {
      this.selectedLookup = val;
    }
  }

  tranformDocumentToString(option: any): string {
    let result = '';
    if (!option) {
      return result;
    }
    if (option.lastname) {
      result += option.lastname + ' ';
    }
    if (option.firstname) {
      result += option.firstname;
      return result;
    }
    if (option.transport_number) {
      return option.transport_number;
    }
    return result;
  }

  onChange($event) {
    try {
      if (!this.selectedLookup || !this.selectedLookup.id) {
        return;
      }
      this._onChange(this.db.doc(this.collectionName + '/' + this.selectedLookup.id).ref);
    } catch (e) {
      console.log(e);
    }
  }

  registerOnChange(fn: (_: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void { }

  compareObjects(o1: any, o2: any): boolean {
    return o1.id === o2.id;
  }
}
