import { Component, OnInit } from '@angular/core';
import { ConstantsService } from '../services/constants/constants.service';
import { ApiCallingServiceService } from '../services/api-calling/api-calling-service.service';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared/shared.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
 
  
  wishResponse: any;
  wish: any;
  products: any;


  constructor(public cons:ConstantsService,
    private apiService: ApiCallingServiceService,
    private router: Router,
    private sharedService: SharedService) {
}
  
  
  
  ngOnInit(): void {
    this.getWishList();

  }

  getWishList(){
    debugger;
    this.apiService.getApiWithToken(this.cons.api.getWishList).subscribe(
    (response: object) => {
      let result: { [key: string]: any } = response;
      this.wishResponse=result['response'];
      console.log(this.wishResponse);
      
    },
    (error: any) => {
      console.error('Add wishlist failed:', error);
    }
  );
  }

  deleteWishlist(i: number,wishId: any){
    this.wishResponse.splice(i, 1);
    this.apiService.deleteApiWithToken(this.cons.api.deleteWish+'/'+wishId).subscribe(
      (response: object) => {
        let result: { [key: string]: any } = response;
       
        this.wishResponse=result['response'];
        console.log(this.wishResponse);
        this.sharedService.wishListCount--;
  
      },
      (error: any) => {
        console.error('Add wishlist failed:', error);
      }
    );

  }

  addToCart(product: any, index: number) {
    this.apiService.getApiWithToken(this.cons.api.addToCart + '/' + product.productId).subscribe(
        (response: object) => {
            let result: { [key: string]: any } = response;
            this.products = result['response'];
            console.log(this.products);

            if (result['status'] == 200) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Product Added To The Cart",
                    showConfirmButton: false,
                    timer: 1800
                });
                this.sharedService.cartCount++;
                // Remove the product from the wishlist
                this.wishResponse.splice(index, 1);
            }

            if (this.products === "exception  product is already present in the cart") {
                Swal.fire({
                    text: "Product is Already in the Cart",
                    imageUrl: "../assets/cart/cart.jpg",
                    imageWidth: 400,
                    imageHeight: 200,
                    imageAlt: "Custom image",
                });
            }
        },
        (error) => {
            alert("You are Admin OR You have logged In.. Please Login first to add Product to Cart")
            console.error('Add Product failed:', error);
        }
    );
}

    

}
