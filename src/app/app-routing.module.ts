import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CouriersComponent } from './pages/couriers/couriers.component';
import { RecipientsComponent } from './pages/recipients/recipients.component';
import { SendersComponent } from './pages/senders/senders.component';
import { TransportComponent } from './pages/transport/transport.component';
import { LeadsComponent } from './pages/leads/leads.component';

const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'couriers', component: CouriersComponent },
  { path: 'leads', component: LeadsComponent },
  { path: 'recipients', component: RecipientsComponent },
  { path: 'senders', component: SendersComponent },
  { path: 'transport', component: TransportComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
