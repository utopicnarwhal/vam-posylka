import { Component, OnInit } from '@angular/core';
import { LeadService } from '../services/lead.service';
import { Lead } from '../models/lead';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  leads: Lead[];
  displayedColumns: string[] = [
    'id',
    'recipient',
    'sender',
    'order_date',
    'delivery_date',
    'price',
    'courier',
    'transport'
  ];

  nameForAdd = '';
  descriptionForAdd = '';

  constructor(private leadService: LeadService) { }

  ngOnInit() {
    this.leadService.getLeads().subscribe((leads) => {
        return this.leads = leads;
    });
  }

  public addLead() {
    this.nameForAdd = '';
    this.descriptionForAdd = '';
  }
}
