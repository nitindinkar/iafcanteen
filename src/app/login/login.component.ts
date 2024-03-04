import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  showRegistrationForm: boolean = false; 
  showLoginForm: boolean = true;
  ngOnInit(): void {
    $.getScript('assets/js/flex-slider.js');

  }
  

  toggleRegistrationForm() {
    this.showLoginForm = !this.showLoginForm;
    this.showRegistrationForm = !this.showRegistrationForm;
  }
}
