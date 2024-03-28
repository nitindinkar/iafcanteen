import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConstantsService {
  constructor() {}

  //serviceUrl = 'http://192.168.120.78:8082/';
   //serviceUrl = 'http://192.168.212.84:8082/';
    //serviceUrl = 'http://localhost:8082/';
   serviceUrl = 'http://13.200.245.74:8083/ecommerce/';
  constants={
    groceryCard:'Grocery',
    liquorCard: 'Liquor'
  };
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
    upload:this.serviceUrl+"fileUpload/uploadFile",
    buyProduct:this.serviceUrl+"order/placeOrder",
    deleteCartItemsById:this.serviceUrl+"cart/deleteCartItem",
    addToWishlist:this.serviceUrl+"wishlist/addToWishlist",
    generatePdf:this.serviceUrl+"order/pdf",
    viewProductById:this.serviceUrl+"product/getProductById",
    myAccountDetails:this.serviceUrl+"loginAuth/getAddress",
    getOrderDetails:this.serviceUrl+"order/getOrderDetailsOfUser"

  };
}
