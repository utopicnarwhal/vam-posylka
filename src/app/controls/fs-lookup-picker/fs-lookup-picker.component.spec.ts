import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsLookupPickerComponent } from './fs-lookup-picker.component';

describe('FsLookupPickerComponent', () => {
  let component: FsLookupPickerComponent;
  let fixture: ComponentFixture<FsLookupPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsLookupPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsLookupPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
