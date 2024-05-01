import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConstantsService } from '../services/constants/constants.service';
import { ApiCallingServiceService } from '../services/api-calling/api-calling-service.service';
import { Router } from '@angular/router';
import {SharedService} from "../services/shared/shared.service";




@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  products: any;
  cart: any;
  subtotal: number = 0;
  acc:any|number
  private cardType: String='';
  cartEmpty:boolean=false;


  ngOnInit(): void {

    if(localStorage.getItem('card')==this.cons.constants.liquorCard) {
      this.cardType = 'L';
      this.getCartDetails();
    }
    else{
      this.cardType = 'G';
      this.getCartDetails();
    }

    }


  constructor(private cons:ConstantsService,
    private apiService: ApiCallingServiceService,
    private sharedService: SharedService,
    private router: Router) {
}

  getCartDetails(){

    this.apiService.getApiWithToken(this.cons.api.getCartDetailsOfUser+'/'+this.cardType).subscribe(
      (response: object) => {
        
        let result: { [key: string]: any } = response;
        debugger;
       
        if(result['response']==="exception No products found in the cart for the user")
          {
           this.cartEmpty=true;
           
          }else{
            this.cartEmpty=false;
          }

        this.cart=result['response'];
        this.sharedService.cartList=this.cart;
        this.sharedService.cartCount=result['response'].length;
        console.log("this is the total cart"+this.cart);
        
        debugger;

        if(result['response']!="exception No products found in the cart for the user"){
        if(this.sharedService.cartList.length==0){
          this.cartEmpty=true;
        }else{
          this.cartEmpty=false;
        }
      }

        

       
        for(let product of this.cart){
          product.product.quantity=1;
          console.log(product.product);

        }
        this.calculateSubtotal();
      },
      (error) => {
        console.error('Add Product failed:', error);
      }
    );
  }


  print(cart: any) {
    console.log(cart);
  }

  decreaseQuantity(i: number) {
   
    if (this.cart[i].product.quantity > 1) {
      this.cart[i].product.quantity--;
      this.calculateSubtotal();
      // Decrease quantity, ensuring it doesn't go below 1
  }else{
    this.removeItem(i, this.cart[i].cartId);
      }

    //this.cart[i].product.quantity=Number(this.cart[i].product.quantity)-1;
  }
  increaseQuantity(i: number) {
    this.cart[i].product.quantity=Number(this.cart[i].product.quantity)+1;
    this.calculateSubtotal();

  }
  removeItem(i: number,cartId: any) {
   
    this.cart.splice(i, 1);
    this.apiService.deleteApiWithToken(this.cons.api.deleteCartItemsById + '/' + cartId).subscribe({
      next: (response: any) => {
        console.log('Delete request successful:', response);
        this.sharedService.cartCount--;
        this.calculateSubtotal();

      },
      error: (error) => {
        console.error('Delete request failed:', error);
        // Handle error here if needed, such as displaying an error message to the user
      }
    });







    // Remove the item at the specified index from the cart array
}

calculateSubtotal() {
  this.subtotal = 0;

  if (this.cart && this.cart.length > 0) {
    for (let cartItem of this.cart) {
      if (cartItem.product && cartItem.product.quantity && cartItem.product.productDiscountedPrice) {
        cartItem.total=Number(Number(cartItem.product.quantity) * Number(cartItem.product.productDiscountedPrice));
        this.subtotal += cartItem.total;
      }
    }
  }
  this.sharedService.cartTotal=this.subtotal;
  this.sharedService.cart=this.cart;
  console.log("This is my subtotal"+this.subtotal);
  return this.subtotal;
  }


}

