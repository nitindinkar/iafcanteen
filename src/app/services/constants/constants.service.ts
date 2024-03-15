import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConstantsService {
  constructor() {}

  serviceUrl = 'http://192.168.120.78:8082/';
  // serviceUrl = 'http://192.168.43.200:8082/';
  api = {
    getCartDetailsOfUser:this.serviceUrl+'cart/getCartDetailsOfUser',
    getProductById:this.serviceUrl+'product/getProductById',
    addProduct:this.serviceUrl+'product/addProduct',
    registrationUrl:this.serviceUrl+"loginAuth/registerNewUser",
    sendOtp:this.serviceUrl+"loginAuth/generate-otp",
    verifyEmailotp:this.serviceUrl+"loginAuth/otpVerify",
    login:this.serviceUrl+"loginAuth/authenticate",
    addToCart:this.serviceUrl+"cart/addToCart",
    getAllCategories:this.serviceUrl+"category/categories",
    getAllProducts:this.serviceUrl+"product/getAllProducts",
    upload:this.serviceUrl+"fileUpload/uploadFile"
  };
}
