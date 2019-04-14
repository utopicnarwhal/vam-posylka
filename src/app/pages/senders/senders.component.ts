import { Component, OnInit, OnDestroy } from '@angular/core';
import { Translator } from 'src/app/utils/translator';
import { Sender } from 'src/app/models/sender';
import { SenderService } from 'src/app/services/data_services/sender.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditorComponent } from '../editor/editor.component';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-senders',
  templateUrl: './senders.component.html',
  styleUrls: ['./senders.component.css']
})
export class SendersComponent implements OnInit, OnDestroy {
  senders: Sender[];
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

  constructor(private senderService: SenderService,
    private dialog: MatDialog,
    public afAuth: AngularFireAuth) {
  }

  ngOnInit() {
    this.subscriptions.push(
      this.senderService.getSenders().subscribe((senders) => {
        return this.senders = senders;
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

  openEditor(sender: Sender = null) {
    this.subscriptions.push(
      this.dialog.open(EditorComponent, { data: { values: sender, type: 'Sender' } }).afterClosed().subscribe((response) => {
        if (!response || !response.data) {
          return;
        }
        if (response.delete) {
          this.senderService.deleteSender(response.data);
          return;
        }
        if (response.data.id) {
          this.senderService.updateSender(response.data);
          return;
        }
        this.senderService.addSender(response.data);
      })
    );
  }
}
