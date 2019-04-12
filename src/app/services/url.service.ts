import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor(private router: Router) { }

  public goToHome() {
    this.router.navigate(['home']);
  }

  public goToCouriers() {
    this.router.navigate(['couriers']);
  }

  public goToLeads() {
    this.router.navigate(['leads']);
  }

  public goToRecipients() {
    this.router.navigate(['recipients']);
  }

  public goToSenders() {
    this.router.navigate(['senders']);
  }

  public goToTransport() {
    this.router.navigate(['transport']);
  }
}
