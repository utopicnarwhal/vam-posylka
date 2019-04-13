import { Component, OnInit, OnDestroy } from '@angular/core';
import { Translator } from 'src/app/utils/translator';
import { Transport } from 'src/app/models/transport';
import { TransportService } from 'src/app/services/data_services/transport.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditorComponent } from '../editor/editor.component';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css']
})
export class TransportComponent implements OnInit, OnDestroy {
  transports: Transport[];
  subscriptions: Subscription[] = [];

  displayedColumns: string[] = [
    'transport_number',
    'model',
    'registration_date',
    'color',
    'edit',
  ];

  constructor(private transportService: TransportService,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.subscriptions.push(
      this.transportService.getTransports().subscribe((transports) => {
        return this.transports = transports;
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

  openEditor(transport: Transport = null) {
    this.subscriptions.push(
      this.dialog.open(EditorComponent, { data: { values: transport, type: 'Transport' } }).afterClosed().subscribe((response) => {
        if (!response || !response.data) {
          return;
        }
        if (response.delete) {
          this.transportService.deleteTransport(response.data);
          return;
        }
        if (response.data.id) {
          this.transportService.updateTransport(response.data);
          return;
        }
        this.transportService.addTransport(response.data);
      })
    );
  }
}
