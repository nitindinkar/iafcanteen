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
userType: any;
serviceNumber: any;
adminPassword: any;
serviceNo: any;
userName: any;
userPassword: any;
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
          alert("Registration Successfull");

          this.name = '';
          this.liquorCardNumber = '';
          this.groceryCardNumber = '';
          this.pan = '';
          this.adhaar = '';
          this.dob = '';
          this.contactNumber = '';
          this.password = '';
          this.email = '';
          this.getotp = '';
          
         

        },
        (error) => {
          alert("Please Enter Valid Details")
          // Handle login failure, e.g., display an error message
          console.error('Login failed:', error);
        }
      );
  }


  // verifyLoginCredentials(){
  //   this.login();
  
  //   const cardType= this.selected;
  //   const cardNumber=this.cardNumber;
  //   const extractedLetters = this.cardNumber.substring(0, 2);
  //   // if(this.selected=="Grocery" && extractedLetters==="Gq"){
  //   //     this.login();

  //   // }
  //   // else if(this.selected=="Liquor"&& extractedLetters==="Lq"){
  //   //   this.login();
  //   //   }
  //     // else{
  //     //   alert("Please Enter Card Type  According to the Card Number");
  //     // }




  // }

  login(){
    debugger;
    const loginUrl=this.ConstServiceService.api.login;
    // const headers = new HttpHeaders({
    //   'cardType': this.selected,
    // });
   
      let credentials:any = {
      userName:this.userName,
      userPassword:this.userPassword,
      userType:this.userType,
      cardType: this.selected !== undefined ? this.selected : null,
    }

    console.log(credentials);

      this.HttpClient.post(loginUrl, credentials)
      .subscribe(
        (response: object) => {
          let result: { [key: string]: any } = response;
          // Handle successful login, e.g., redirect the user or perform other actions

          console.log(result);

            if(result['message']=='success'){
            this.sharedService.loggedIn=true;
            this.token=result['response'].jwtToken.toString();
            localStorage.setItem('token','Bearer '+this.token);
            localStorage.setItem('loginResponse', JSON.stringify(result['response']));
            localStorage.setItem('userId',JSON.stringify(result['response']['user']['id']))
           
            this.sharedService.loginResponse=JSON.stringify(result['response']);
            const roleName = result['response']['user']['roles'][0]['roleName'];
            debugger;
             this.sharedService.role=roleName;

             let cardType = '';
             if (result['response']['user']['liquorCardNumber']) {
              cardType = 'Liquor';
              console.log("this is liquor cardtype"+cardType);
              } else if (result['response']['user']['groceryCardNumber']) {
               cardType = 'Grocery';
               console.log("this is liquor cardtype"+cardType);
              }
             console.log(roleName);

            
            
            console.log(this.sharedService);
            if(this.sharedService.role!='ADMIN'&& this.selected=='Grocery'){
              this.sharedService.cardType=this.ConstServiceService.constants.groceryCard
              this.router.navigate(['']);
            }

            else if(this.sharedService.role!='ADMIN'  && this.selected=='Liquor'){
              localStorage.setItem('card',this.ConstServiceService.constants.liquorCard);
              this.sharedService.cardType=this.ConstServiceService.constants.liquorCard;
              this.router.navigate(['/liquor']);
            }
              debugger;
            if(this.sharedService.role=='ADMIN'){
              this.router.navigate(['/admin']);
             }
             if(this.sharedService.role=="SUPER_ADMIN"){
              this.router.navigate(['/superadmin']);
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
