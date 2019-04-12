import { Component, OnInit } from '@angular/core';
import { Translator } from 'src/app/utils/translator';
import { Sender } from 'src/app/models/sender';
import { SenderService } from 'src/app/services/data_services/sender.service';

@Component({
  selector: 'app-senders',
  templateUrl: './senders.component.html',
  styleUrls: ['./senders.component.css']
})
export class SendersComponent implements OnInit {
    senders: Sender[];

    displayedColumns: string[] = [
        'firstname',
        'lastname',
        'middlename',
        'birthdate',
        'postcode',
        'city',
        'street',
        'house',
        'appartment',
        'mobilephone',
    ];

    constructor(private senderService: SenderService) {
      this.senderService.getSenders().subscribe((senders) => {
          return this.senders = senders;
      });
    }

    ngOnInit() {
    }

    translateTableHeader(engTitle: string) {
      return Translator.translateTableHeaders(engTitle);
    }
}
