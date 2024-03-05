import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstServiceService {

  constructor() { }

  serviceUrl="http://localhost:8081/"

  api={
    
      "registrationUrl":this.serviceUrl+"registerNewUser",
      "emailVerifyUrl":this.serviceUrl+"otpVerify",
     }
}
