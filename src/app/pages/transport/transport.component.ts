import { Component, OnInit, OnDestroy } from '@angular/core';
import { Translator } from 'src/app/utils/translator';
import { Transport } from 'src/app/models/transport';
import { TransportService } from 'src/app/services/data_services/transport.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css']
})
export class TransportComponent implements OnInit, OnDestroy {
  transports: Transport[];
  subscription: Subscription;

  displayedColumns: string[] = [
    'transport_number',
    'model',
    'registration_date',
    'color',
  ];

  constructor(private transportService: TransportService) {
    this.transportService.getTransports().subscribe((transports) => {
      return this.transports = transports;
    });
  }

  ngOnInit() {
    this.subscription = this.transportService.getTransports().subscribe((transports) => {
      return this.transports = transports;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  translateTableHeader(engTitle: string) {
    return Translator.translateTableHeaders(engTitle);
  }
}
