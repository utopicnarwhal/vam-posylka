import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerTimestampComponent } from './datepicker-timestamp.component';

describe('DatepickerTimestampComponent', () => {
  let component: DatepickerTimestampComponent;
  let fixture: ComponentFixture<DatepickerTimestampComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatepickerTimestampComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerTimestampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
