import { Component, OnInit, OnDestroy } from '@angular/core';
import { Translator } from 'src/app/utils/translator';
import { Recipient } from 'src/app/models/recipient';
import { RecipientService } from 'src/app/services/data_services/recipient.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipients',
  templateUrl: './recipients.component.html',
  styleUrls: ['./recipients.component.css']
})
export class RecipientsComponent implements OnInit, OnDestroy {
  recipients: Recipient[];
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

  constructor(private recipientService: RecipientService) {
    this.recipientService.getRecipients().subscribe((recipients) => {
      return this.recipients = recipients;
    });
  }

  ngOnInit() {
    this.subscription = this.recipientService.getRecipients().subscribe((recipients) => {
      return this.recipients = recipients;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  translateTableHeader(engTitle: string) {
    return Translator.translateTableHeaders(engTitle);
  }
}
