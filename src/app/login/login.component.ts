import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {ConstantsService} from "../services/constants/constants.service";
import {ApiCallingServiceService} from "../services/api-calling/api-calling-service.service";
import {Router} from "@angular/router";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {SharedService} from "../services/shared/shared.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  showOtpInput: boolean = false;
  Liquor: any;
  Grocery: any;
  token='';
  constructor(private HttpClient: HttpClient,
              private ConstServiceService:ConstantsService,
              private apiService: ApiCallingServiceService,
              private router:Router,
              private sharedService:SharedService
  ) { }

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
  getotp:any | undefined;
  cardNumber:any;
  cardType:any=[{
    value:'Liquor',
    desc:'Liquor'},{
    value:'Grocery',
    desc:'Grocery'
  }];
  selected:any;
  loginPassword:any;
  type:String='';
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

    const verifyUrl =this.ConstServiceService.api.sendOtp;

    this.HttpClient.get(verifyUrl, { params: credentials, responseType: 'text' })
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
      email:this.email,
      getotp:this.getotp
    };

    const registerationUrl= this.ConstServiceService.api.registrationUrl;

    this.HttpClient.post(registerationUrl, credentials,{responseType:'text'})
      .subscribe(
        (response: any) => {
          alert("registration Successfull");
          // Handle successful login, e.g., redirect the user or perform other actions

        },
        (error) => {
          alert("Please Enter Valid Details")
          // Handle login failure, e.g., display an error message
          console.error('Login failed:', error);
        }
      );
  }


  verifyLoginCredentials(){
    const cardType= this.selected;
    const cardNumber=this.cardNumber;
    const extractedLetters = this.cardNumber.substring(0, 2);
 

    console.log("Frst two letter of card"+extractedLetters);

    console.log("the card Type is ...............>>>>>>>>>>>>>>>>>>"+this.selected);
    if(this.selected=="Grocery" && extractedLetters==="Gq"){
        this.login();
      
    }
    else if(this.selected=="Liquor"&& extractedLetters==="Lq"){
      this.login();
      }
      else{
        alert("please Card Number According to the Card Type Entered")
      }


    

  }

  login(){

    const loginUrl=this.ConstServiceService.api.login;
    const headers = new HttpHeaders({
      'cardType': this.selected,
    });
    
      let credentials:any = {
      cardNumber:this.cardNumber,
      userPassword:this.loginPassword
    }
        
      this.HttpClient.post(loginUrl, credentials,{ headers:headers})
      .subscribe(
        (response: object) => {
          let result: { [key: string]: any } = response;
          
          // Handle successful login, e.g., redirect the user or perform other actions
          
            if(result['message']=='success'){
            this.sharedService.loggedIn=true;
            this.token=result['response'].jwtToken.toString();
            localStorage.setItem('token','Bearer '+this.token);
            localStorage.setItem('loginResponse', JSON.stringify(result['response']));
            this.sharedService.loginResponse=JSON.stringify(result['response']);
            if(this.selected=='Grocery'){

              this.router.navigate(['']);
              this.sharedService.cardType=this.ConstServiceService.constants.groceryCard
            }

            else if(this.selected=='Liquor'){
              localStorage.setItem('card',this.ConstServiceService.constants.liquorCard);
              this.sharedService.cardType=this.ConstServiceService.constants.liquorCard;
              this.router.navigate(['/liquor']);
            }

          }
          
        },
        (error) => {           
          alert("please Enter Valid Credential");     
        }
      );

  }

  verifyOtp() {
    const credentials = {
      email: this.email,
      otp: this.getotp
    };

    const verifyOtpUrl = this.ConstServiceService.api.verifyEmailotp;

    this.HttpClient.post(verifyOtpUrl, credentials, { responseType: 'text' })
      .subscribe(
        (response: any) => {
          // Handle successful OTP verification
          console.log('OTP verification successful:', response);
           // Call your registration function or any other function here
          this.registration();
        },
        (error) => {
          // Handle OTP verification failure
          console.error('OTP verification failed:', error);
        }
      );
  }
}
