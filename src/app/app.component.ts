import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'iafcanteen';
  isShow=false;
  // showHideNav(event:any){
  //   this.isShow= !(event instanceof LoginComponent);
  // }
}
