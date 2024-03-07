import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstServiceService {

  constructor() { }

  serviceUrl="http://localhost:8082/"

  api={
    
      "registrationUrl":this.serviceUrl+"registerNewUser",
      "sendOtp":this.serviceUrl+"generate-otp",
      "verifyEmailotp":this.serviceUrl+"otpVerify",
      "login":this.serviceUrl+"authenticate"
     }
}
