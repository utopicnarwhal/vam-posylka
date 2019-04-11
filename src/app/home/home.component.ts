import { Component, OnInit } from '@angular/core';
import { LeadService } from '../services/lead-service.service';
import { Lead } from '../models/lead';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  leads: Lead[];
  displayedColumns: string[] = ['name', 'description'];

  nameForAdd = '';
  descriptionForAdd = '';

  constructor(private leadService: LeadService) { }

  ngOnInit() {
    this.leadService.getLeads().subscribe((leads) => this.leads = leads);
  }

  public addLead() {
    const lead = {
      name: this.nameForAdd,
      description: this.descriptionForAdd
    };
    this.leadService.addLead(lead);
    this.nameForAdd = '';
    this.descriptionForAdd = '';
  }
}
