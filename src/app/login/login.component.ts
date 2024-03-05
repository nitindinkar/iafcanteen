import { ConstServiceService } from './../const-service.service';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  showOtpInput: boolean = false;
    otp: string = '';

   constructor(private HttpClient: HttpClient,private ConstServiceService:ConstServiceService,
    private router:Router) { }

  showRegistrationForm: boolean = false; 
  showLoginForm: boolean = true;
  name:any;
  liquorCardNumber:any;
  groceryCardNumber:any;
  pan:any;
  adhaar:any;
  dob:any;
  contactNumber:any;
  password:any;
  email:any;
  ngOnInit(): void {
    $.getScript('assets/js/flex-slider.js');

  }
  

  toggleRegistrationForm() {
    this.showLoginForm = !this.showLoginForm;
    this.showRegistrationForm = !this.showRegistrationForm;
  }

  sendOtp() {
    // Logic to send OTP via email or SMS
    // For now, just toggle the visibility of OTP input box
    this.showOtpInput = true;
    this.verify();
}

  verify(){
     const credentials={
      email:this.email,
     }

      const verifyUrl =this.ConstServiceService.api.emailVerifyUrl;

     this.HttpClient.post(verifyUrl, credentials,{responseType:'text'})
      .subscribe(
        (response: any) => {
          // Handle successful login, e.g., redirect the user or perform other actions
          console.log(response);
                    
          
        },
        (error) => {
          // Handle login failure, e.g., display an error message
          console.error('Login failed:', error);
        }
      );
}
  

  registration(){

    const credentials = { 
      name: this.name,
      liquorCardNumber: this.liquorCardNumber,
      groceryCardNumber:this.groceryCardNumber,
      pan:this.pan,
      adhaar:this.adhaar,
      dob:this.dob,
      contactNumber:this.contactNumber,
      password:this.password,
      email:this.email
      };

      const registerationUrl= this.ConstServiceService.api.registrationUrl;


      this.HttpClient.post(registerationUrl, credentials,{responseType:'text'})
      .subscribe(
        (response: any) => {
          // Handle successful login, e.g., redirect the user or perform other actions
          console.log(response);
                    
          
        },
        (error) => {
          // Handle login failure, e.g., display an error message
          console.error('Login failed:', error);
        }
      );
}
}
