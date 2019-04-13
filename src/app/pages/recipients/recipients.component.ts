import { Component, OnInit, OnDestroy } from '@angular/core';
import { Translator } from 'src/app/utils/translator';
import { Recipient } from 'src/app/models/recipient';
import { RecipientService } from 'src/app/services/data_services/recipient.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditorComponent } from '../editor/editor.component';

@Component({
  selector: 'app-recipients',
  templateUrl: './recipients.component.html',
  styleUrls: ['./recipients.component.css']
})
export class RecipientsComponent implements OnInit, OnDestroy {
  recipients: Recipient[];
  subscriptions: Subscription[] = [];

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
    'edit',
  ];

  constructor(private recipientService: RecipientService,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.subscriptions.push(
      this.recipientService.getRecipients().subscribe((recipients) => {
        return this.recipients = recipients;
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

  openEditor(recipient: Recipient = null) {
    this.subscriptions.push(
      this.dialog.open(EditorComponent, { data: { values: recipient, type: 'Recipient' } }).afterClosed().subscribe((response) => {
        if (!response || !response.data) {
          return;
        }
        if (response.delete) {
          this.recipientService.deleteRecipient(response.data);
          return;
        }
        if (response.data.id) {
          this.recipientService.updateRecipient(response.data);
          return;
        }
        this.recipientService.addRecipient(response.data);
      })
    );
  }
}
