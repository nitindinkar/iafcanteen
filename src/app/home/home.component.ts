import { Component, OnInit } from '@angular/core';
import { ApiCallingServiceService } from '../services/api-calling/api-calling-service.service';
import { Router } from '@angular/router';
import { ConstantsService } from '../services/constants/constants.service';
import {SharedService} from "../services/shared/shared.service";
import Swal from "sweetalert2";
import {HeaderComponent} from "../header/header.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  categories: any;
  products: any;
  private currentIndex: number=0;
  private products2: any;
  groccery:boolean=true;
  private cardType: string='';
  ngOnInit(): void {
    debugger;
    if(this.sharedService.loggedIn == true){
      window.location.reload();
    }
    this.getAllCategories();
    if(localStorage.getItem('card')==this.cons.constants.liquorCard){
      this.groccery=false;
      this.cardType='L';
      this.getAllProduct();
    }
    else{
      this.groccery=true;
      this.cardType='G'
      this.getAllProduct();
    }

  }

  constructor(private cons:ConstantsService,
    private apiService: ApiCallingServiceService,
    private router: Router,
    private sharedService:SharedService,
              private header:HeaderComponent) {
}

  private getAllCategories() {
    this.apiService.getApiWithToken(this.cons.api.getAllCategories).subscribe(
      (response: object) => {
        let result: { [key: string]: any } = response;
        this.categories=result['response'];

      },
      (error) => {
        console.error('Add Product failed:', error);
      }
    );
  }
  public getAllProduct() {
    if(localStorage.getItem('card')==this.cons.constants.liquorCard){
      this.groccery=false;
      this.cardType='L';
    }
    else{
      this.groccery=true;
      this.cardType='G'
    }
    this.apiService.getApiWithToken(this.cons.api.getAllProducts+'/'+this.cardType).subscribe(
      (response: object) => {
        let result: { [key: string]: any } = response;
        this.products=result['response'];


        // // Filter products based on the search key
        // if (this.searchKey && this.searchKey.trim() !== '') {
        //   this.products = this.products.filter((product: { productName: string; }) =>
        //     product.productName.toLowerCase().includes(this.searchKey.toLowerCase())
        //   );
        //
        // }


        this.products = this.products.map((product: { imageUrl: string; }) => ({ ...product, imageUrl: this.cons.serviceUrl + product.imageUrl }));

        this.products2=[];
        for(let product of this.products){
          product.imageUrl=this.cons.serviceUrl+product.imageUrl;
          if(this.groccery&&product.category.type=='G'){
            this.products2.push(product);
          }
          else if(!this.groccery&&product.category.type=='L'){
            this.products2.push(product);
          }
        }
        this.getItems();
        return(this.products);
      },
      (error) => {
        console.error('Add Product failed:', error);
      }
    );
  }

  trendingList:any[]=[];
  hotList:any[]=[];

  private getItems() {
    const randomIndexes1:any[] = [];
    while (randomIndexes1.length < 8) {
      const randomIndex = Math.floor(Math.random() * this.products2.length);
      if (!randomIndexes1.includes(randomIndex)) {
        randomIndexes1.push(randomIndex);
      }
    }
    randomIndexes1.forEach(index => {
      this.trendingList.push(this.products2[index]);
    });
    const randomIndexes2:any[] = [];
    while (randomIndexes2.length < 10) {
      const randomIndex = Math.floor(Math.random() * this.products2.length);
      if (!randomIndexes2.includes(randomIndex)) {
        randomIndexes2.push(randomIndex);
      }
    }
    randomIndexes2.forEach(index => {
      this.hotList.push(this.products2[index]);
    });

    const randomIndexes3:any[] = [];
    while (randomIndexes3.length < 4) {
      const randomIndex = Math.floor(Math.random() * this.products.length);
      if (!randomIndexes3.includes(randomIndex)) {
        randomIndexes3.push(randomIndex);
      }
    }
    // randomIndexes1.forEach(index => {
    //   this.trendingList.push(this.products[index]);
    // });
  }
  addToCart(product:any) {


    this.apiService.getApiWithToken(this.cons.api.addToCart+'/'+product.productId).subscribe(
      (response: object) => {
        debugger;
        let result: { [key: string]: any } = response;
        this.products=result['response'];
        debugger;
        // this.sharedService.cartCount++;
        debugger;

        if(result['status']==200){
          this.header.ngOnInit();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Product Added To The Cart",
            showConfirmButton: false,
            timer: 1800
          });


        }

        if(this.products==="exception  product is already present in the cart"){
          debugger;
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
  setIndex(i: number) {
    this.currentIndex=i;
    debugger;

  }
  addToWish(product:any) {
    debugger;

    this.apiService.getApiWithToken(this.cons.api.addToWishlist+'/'+product.productId).subscribe(
      (response: object) => {
        let result: { [key: string]: any } = response;
        this.products=result['response'];
        this.products2 =result['response'];
        console.log(this.products);
        console.log(result);
        if(result['status']==200){
          debugger;
          product.isInWishlist = true;

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Added to Wihslist",
            showConfirmButton: false,
            timer: 1500
          });

          this.sharedService.wishListCount++;

          // alert("Product added successfully");
        }else{
          Swal.fire("Already Added to wihslist");
        }
      },
      (error) => {
        console.error('Add Product failed:', error);
      }
    );
  }


}
