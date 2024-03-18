import { Component, OnInit } from '@angular/core';
import { ConstantsService } from '../services/constants/constants.service';
import { ApiCallingServiceService } from '../services/api-calling/api-calling-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  products: any;
  cart: any;
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
    this.cart[i].product.quantity=Number(this.cart[i].product.quantity)-1;
  }
  increaseQuantity(i: number) {
    this.cart[i].product.quantity=Number(this.cart[i].product.quantity)+1;
  }
}
