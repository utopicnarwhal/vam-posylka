import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UrlService } from 'src/app/services/url.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public login: string;
  public password: string;
  public subscription: Subscription;

  constructor(
    public url: UrlService,
    public afAuth: AngularFireAuth) { }

  ngOnInit() {
    // this.subscription = this.afAuth.user.subscribe(user => {
    //   if (user) {
    //     this.url.goToHome();
    //   }
    // });
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

  async adminLoginClick() {
    if (this.login && this.password) {
      await this.afAuth.auth.signInWithEmailAndPassword(this.login, this.password).then(credentials => {
        if (credentials.user.uid !== '8G6TPHuF7OYFxFsR7OSlCTmfuLk1') {
          console.log('Вы не администратор');
          this.login = '';
          this.password = '';
          return;
        }
        this.url.goToHome();
      }).catch(reason => {
        console.log('Неправильный логин или пароль' + reason);
        this.login = '';
        this.password = '';
      });
    }
  }

  async operatorLoginClick() {
    if (this.login && this.password) {
      await this.afAuth.auth.signInWithEmailAndPassword(this.login, this.password).then(credentials => {
        if (credentials.user.uid === '8G6TPHuF7OYFxFsR7OSlCTmfuLk1') {
          console.log('Вы не оператор');
          this.login = '';
          this.password = '';
          return;
        }
        this.url.goToHome();
      }).catch(reason => {
        console.log('Неправильный логин или пароль' + reason);
        this.login = '';
        this.password = '';
      });
    }
  }
}
