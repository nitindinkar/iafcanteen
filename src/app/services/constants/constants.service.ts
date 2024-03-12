import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConstantsService {
  constructor() {}

  serviceUrl = 'http://192.168.133.84:8082/';
  api = {
        addProduct:this.serviceUrl+'product/add-product',
    registrationUrl:this.serviceUrl+"registerNewUser",
    sendOtp:this.serviceUrl+"generate-otp",
    verifyEmailotp:this.serviceUrl+"otpVerify",
    login:this.serviceUrl+"authenticate1"
  };
}
