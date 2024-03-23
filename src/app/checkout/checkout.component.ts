import { SharedService } from './../services/shared/shared.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallingServiceService } from '../services/api-calling/api-calling-service.service';
import { ConstantsService } from '../services/constants/constants.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  fullName: any;
  fullAddress: any;
  contactNumber: any;
  alternateContactNumber: any;
  flag: boolean = false;
  cart: any;
  subtotal: any | Number;
  public cartTotal: any;
  public  cartItems: any;
  
  display:Boolean=false;
  constructor(
    private router: Router,
    private http: HttpClient,
    private apiService: ApiCallingServiceService,
    private cons: ConstantsService,
    private sharedService:SharedService
  ) {}

  ngOnInit(): void {
    
    this.getCartDetails();
    this.cartItems=this.sharedService.cart;
    this.cartTotal=this.sharedService.cartTotal;
    debugger;
  }


  bookOrder(){
    debugger;

    const orderProductQuantityList = [];

    if (this.cartItems) {
    for (let cart of this.cartItems) {
      // Extract productId and quantity for the current item
      const productId = cart.product.productId;
      const quantity = cart.product.quantity;
  
      // Push the productId and quantity to the productQuantityList array
      orderProductQuantityList.push({ productId: productId, quantity: quantity });
    }
  }
    
    this.flag=true;
    const billingData = {
      fullName: this.fullName,
      fullAddress: this.fullAddress,
      contactNumber: this.contactNumber,
      alternateContactNumber: this.alternateContactNumber,
      productId:this.cartItems.productId,
      quantity:this.cartItems.quantity,
      orderProductQuantityList
      };
      console.log(billingData);

    this.apiService.postApiWithToken(this.cons.api.buyProduct+"/"+this.flag, billingData).subscribe({
      next: (v: object) => {
        let result: { [key: string]: any } = v;
        if (result['message'] == 'success') {
           alert('Your Order has been placed successfully,Please Collect your Order at your respected slot to avoid cancellation of order.');
           this.generateReport();

        } else {

        }
      },
      error: (e) => {

        console.error(e);
      },
      complete: () => console.log(),
    });


  }

  getCartDetails(){

    this.apiService.getApiWithToken(this.cons.api.getCartDetailsOfUser).subscribe(
      (response: object) => {
        let result: { [key: string]: any } = response;
        this.cart=result['response'];
        debugger;
        for(let product of this.cart){
          product.product.quantity=1;
          console.log(product.product);

        }
        //this.calculateSubtotal();
      },
      (error) => {
        console.error('Add Product failed:', error);
      }
    );
  }
  calculateSubtotal() {
    this.subtotal = 0;
    debugger;
    if (this.cart && this.cart.length > 0) {
      for (let cartItem of this.cart) {
        if (cartItem.product && cartItem.product.quantity && cartItem.product.productDiscountedPrice) {
          this.subtotal += cartItem.product.quantity * cartItem.product.productDiscountedPrice;
        }
      }
    }
    console.log("This is my subtotal"+this.subtotal);
    return this.subtotal;
    }

    saveAddress(){
      alert("Address saved sucessfully");
      this.display=true;
    }

    generateReport(){

      this.apiService.getApiWithToken(this.cons.api.generatePdf).subscribe(
        (response: object) => {
          let result: { [key: string]: any } = response;
          this.cart=result['response'];
          if (result['message'] == 'success') {
            alert('Your PdF report  has been placed successfully downloaded');
          }

           
        },
        (error) => {
          console.error('Add Product failed:', error);
        }
      );
    }

   

      

}


