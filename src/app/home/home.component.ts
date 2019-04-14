import { Component, OnInit } from '@angular/core';
import { UrlService } from '../services/url.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    public url: UrlService,
    public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }
}
