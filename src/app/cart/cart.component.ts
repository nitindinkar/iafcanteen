import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConstantsService } from '../services/constants/constants.service';
import { ApiCallingServiceService } from '../services/api-calling/api-calling-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';



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
  
  
  ngOnInit(): void {
    this.getCartDetails();
    

  }


  constructor(private cons:ConstantsService,
    private apiService: ApiCallingServiceService,
    private router: Router) {
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
    debugger;
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
    debugger;
    this.cart.splice(i, 1);
    this.apiService.deleteApiWithToken(this.cons.api.deleteCartItemsById + '/' + cartId).subscribe({
      next: (response: any) => {
        console.log('Delete request successful:', response);
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

  

}

