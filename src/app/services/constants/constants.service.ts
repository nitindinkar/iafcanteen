import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConstantsService {
  constructor() {}

  //serviceUrl = 'http://192.168.120.78:8082/';
   //serviceUrl = 'http://192.168.212.84:8082/';
    //serviceUrl = 'http://localhost:8082/';
    serviceUrl = 'http://13.200.245.74:8083/ecommerce/'; // server url
   //serviceUrl=  'http://192.168.54.64:8082/';
  // serviceUrl = 'http://192.168.201.236:8082/'; // vaibhav localhost
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
    getOrderDetails:this.serviceUrl+"order/getOrderDetailsOfUser",
    getWishList:this.serviceUrl+"wishlist/WishlistDetailsOfUser",
    addCategory: this.serviceUrl+"category/add-category",
    deleteWish:this.serviceUrl+"wishlist/deleteWishlistItem",
    getUserAddress:this.serviceUrl+"address/getAddressByUser",
    saveAddress:this.serviceUrl+"address/addAddress",
    getAdminOrders:this.serviceUrl+"order/getAllOrderDetailsOfAdmin/ALL",
    getOrderDetailsById:this.serviceUrl+"",
    adminDeleteOrder:this.serviceUrl+"order/cancelOrder",
    addAdminDetails:this.serviceUrl+"super-admin/create-admin",
    getActiveAdmins:this.serviceUrl+"super-admin/active-admins",
    addStore:this.serviceUrl+"super-admin/add-store",
    deleteProduct:this.serviceUrl+"product/deleteProductDetails",
    updateProduct:this.serviceUrl+"product/updateProduct",
    getAllProductAdmin:this.serviceUrl+"product/getAllProductsAdmin",
    getAllActiveStores:this.serviceUrl+"super-admin/active-stores",
    activeAdmins:this.serviceUrl+"super-admin/active-admins",
    deactiveAdmins:this.serviceUrl+"super-admin/inactive-admins",
    activateStore:this.serviceUrl+"super-admin/re-activate-store",
    deactivateStore:this.serviceUrl+"super-admin/inactivate-store",
    deleteStore:this.serviceUrl+"super-admin/deleteStoreById",
  
    
    




  };
}
