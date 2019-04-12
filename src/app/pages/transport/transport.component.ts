import { Component, OnInit } from '@angular/core';
import { Translator } from 'src/app/utils/translator';
import { Transport } from 'src/app/models/transport';
import { TransportService } from 'src/app/services/data_services/transport.service';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.css']
})
export class TransportComponent implements OnInit {
    transports: Transport[];

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
    }

    translateTableHeader(engTitle: string) {
      return Translator.translateTableHeaders(engTitle);
    }
}
