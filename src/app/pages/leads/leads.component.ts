import { Component, OnInit } from '@angular/core';
import { Lead } from 'src/app/models/lead';
import { LeadService } from 'src/app/services/data_services/lead.service';
import { Translator } from 'src/app/utils/translator';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsComponent implements OnInit {
    leads: Lead[];

    displayedColumns: string[] = [
      'recipient',
      'sender',
      'order_date',
      'delivery_date',
      'price',
      'courier',
      'transport',
    ];

    constructor(private leadService: LeadService) {
      this.leadService.getLeads().subscribe((leads) => {
          return this.leads = leads;
      });
    }

    ngOnInit() {
    }

    translateTableHeader(engTitle: string) {
      return Translator.translateTableHeaders(engTitle);
    }
}
