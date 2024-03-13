import {Component, Injectable} from '@angular/core';
import {Router} from "@angular/router";



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
@Injectable()
export class HeaderComponent {
  constructor(
    private router: Router,

  ) {}
  username:string='';
  login:boolean=false;

  logout() {
    this.username='';
    localStorage.removeItem('token');
  }
}
