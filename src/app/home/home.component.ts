import { Component, OnInit } from '@angular/core';
import { LeadService } from '../services/lead.service';
import { Lead } from '../models/lead';
import { Courier } from '../models/courier';
import { CourierService } from '../services/courier.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  leads: Lead[];
  couriers: Courier[];

  displayedColumnsLead: string[] = [
    'id',
    'recipient',
    'sender',
    'order_date',
    'delivery_date',
    'price',
    'courier',
    'transport'
  ];

  displayedColumnsCourier: string[] = [
    'id',
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

  nameForAdd = '';
  descriptionForAdd = '';

  constructor(
    private leadService: LeadService,
    private courierService: CourierService
  ) { }

  ngOnInit() {
    this.leadService.getLeads().subscribe((leads) => {
      return this.leads = leads;
    });
    this.courierService.getCouriers().subscribe((couriers) => {
      return this.couriers = couriers;
    });
  }

  public addLead() {
    this.nameForAdd = '';
    this.descriptionForAdd = '';
  }
}
