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
        // for(let product of this.products){
        //   product.imageUrl=this.cons.serviceUrl+product.imageUrl;

        // }
      },
      (error) => {
        console.error('Add Product failed:', error);
      }
    );
  }

  

  

}
