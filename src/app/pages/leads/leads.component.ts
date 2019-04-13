import { Component, OnInit, OnDestroy } from '@angular/core';
import { Lead } from 'src/app/models/lead';
import { LeadService } from 'src/app/services/data_services/lead.service';
import { Translator } from 'src/app/utils/translator';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { EditorComponent } from '../editor/editor.component';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsComponent implements OnInit, OnDestroy {
  leads: Lead[];
  subscriptions: Subscription[] = [];

  displayedColumns: string[] = [
    'recipient',
    'sender',
    'order_date',
    'delivery_date',
    'price',
    'courier',
    'transport',
    'edit',
  ];

  constructor(private leadService: LeadService,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.subscriptions.push(
      this.leadService.getLeads().subscribe((leads) => {
        return this.leads = leads;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  translateTableHeader(engTitle: string) {
    return Translator.translateTableHeaders(engTitle);
  }

  openEditor(lead: Lead = null) {
    this.subscriptions.push(
      this.dialog.open(EditorComponent, { data: { values: lead, type: 'Lead' } }).afterClosed().subscribe((response) => {
        if (!response || !response.data) {
          return;
        }
        if (response.delete) {
          this.leadService.deleteLead(response.data);
          return;
        }
        if (response.data.id) {
          this.leadService.updateLead(response.data);
          return;
        }
        this.leadService.addLead(response.data);
      })
    );
  }
}
