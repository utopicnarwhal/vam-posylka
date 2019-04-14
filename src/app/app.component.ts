import { Component, OnInit } from '@angular/core';
import { UrlService } from './services/url.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    public url: UrlService,
    public afAuth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    this.afAuth.user.subscribe(user => {
      if (!user) {
        this.url.goToLogin();
      }
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
