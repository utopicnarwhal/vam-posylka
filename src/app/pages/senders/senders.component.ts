import { Component, OnInit, OnDestroy } from '@angular/core';
import { Translator } from 'src/app/utils/translator';
import { Sender } from 'src/app/models/sender';
import { SenderService } from 'src/app/services/data_services/sender.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-senders',
  templateUrl: './senders.component.html',
  styleUrls: ['./senders.component.css']
})
export class SendersComponent implements OnInit, OnDestroy {
  senders: Sender[];
  subscription: Subscription;

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
    this.subscription = this.senderService.getSenders().subscribe((senders) => {
      return this.senders = senders;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  translateTableHeader(engTitle: string) {
    return Translator.translateTableHeaders(engTitle);
  }
}
