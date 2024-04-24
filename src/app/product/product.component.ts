import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import { ConstantsService } from '../services/constants/constants.service';
import { ApiCallingServiceService } from '../services/api-calling/api-calling-service.service';
import { SharedService } from '../services/shared/shared.service';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit{

  groccery:boolean=true;
  categories:any;
  products: any;
  products2: any;
  viewProducts: any;
  p: number = 1;
  public currentIndex:number=0;
  private cardType: string='';
  searchKey: string='';
  isInWishlist: boolean=false;
  quantity:number=1;
  cart: any;
  subtotal:any;
  

  constructor(public cons:ConstantsService,
              private apiService: ApiCallingServiceService,
              private router: Router,
              private sharedService: SharedService) {}

  ngOnInit(): void {
    debugger;
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

    this.getAllCategories();
    this.searchKey = this.sharedService.searchKey;
    console.log(this.searchKey);
  }

  public getAllCategories() {
    this.apiService.getApiWithToken(this.cons.api.getAllCategories).subscribe(
      (response: object) => {
        let result: { [key: string]: any } = response;
        this.categories=result['response'];
        for(let cat of this.categories){
          if(this.sharedService.selectedCategory!=undefined){
            console.log(this.sharedService.selectedCategory.id);
            console.log(cat.id);
            if(this.sharedService.selectedCategory.id==cat.id)
              cat.selected=true;
            else
              cat.selected=false;
          }
          else{
            cat.selected=false;
          }
        }
        this.selectCat();
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
        

        // Filter products based on the search key
      if (this.searchKey && this.searchKey.trim() !== '') {
            this.products = this.products.filter((product: { productName: string; }) =>
            product.productName.toLowerCase().includes(this.searchKey.toLowerCase())
          );
          
        }
               

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
        return(this.products);
      },
      (error) => {
        console.error('Add Product failed:', error);
      }
    );
  }




  addToCart(product:any) {
       

    this.apiService.getApiWithToken(this.cons.api.addToCart+'/'+product.productId).subscribe(
      (response: object) => {
        debugger;
        let result: { [key: string]: any } = response;
        this.products=result['response'];
        console.log(this.products);

        if(result['status']==200){
          debugger;

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Product Added To The Cart",
            showConfirmButton: false,
            timer: 1800
          });
          this.sharedService.cartCount++;
          debugger;
          console.log(this.products);


          
          //this.showSnackBar('Product added to cart successfully.');
          
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

  viewAddToCart(prodId:any) {
    debugger;

    if (prodId.isInCart) {
      alert("Product is already in the cart!");
      return; // Exit the function to prevent further execution
    }

    this.apiService.getApiWithToken(this.cons.api.addToCart+'/'+prodId).subscribe(
      (response: object) => {
        let result: { [key: string]: any } = response;
        this.products=result['response'];

        if(result['status']==200){
          debugger;
          alert("Product added successfully");

          //this.showSnackBar('Product added to cart successfully.');
          prodId.isInCart = true;
        }else{
          alert("Product not added");
          //this.showSnackBar('Failed to add product to cart.');
        }
      },
      (error) => {
        console.error('Add Product failed:', error);
      }
    );
  }


  redirect(productId: any) {
    localStorage.removeItem('productId');
    localStorage.setItem('productId',productId);
    this.router.navigate(['/shop-detail']);
  }
  createImageUrl(imageData: any) {
    try {
      const imageUrl = URL.createObjectURL(imageData.image);
      imageData.imageUrl = imageUrl;
    } catch (error) {
      console.error('Error creating Object URL:', error);
    }

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


  selectCat() {
    this.p=1;
    let count=0;
    this.products2=[];
    for(let cat of this.categories){
      if(cat.selected==true){
        count++;
        for(let prod of this.products){
          if(prod.category.id==cat.id){
            this.products2.push(prod);
          }
        }
      }
    }
    debugger;
    if(count == 0){
      for(let product of this.products){
        if(this.groccery&&product.category.type=='G'){
          this.products2.push(product);
        }
        else if(!this.groccery&&product.category.type=='L'){
          this.products2.push(product);
        }
      }
    }
  }
  viewProduct(product:any) {
    this.apiService.getApiWithToken(this.cons.api.viewProductById+'/'+product.productId).subscribe(
      (response: object) => {
        let result: { [key: string]: any } = response;
        this.viewProducts=result['response'];

        //this.products2 =result['response'];

      },
      (error) => {
        console.error('Add Product failed:', error);
      }
    );

    }

    // pagination start....

  //   get totalPages(): number {
  //     return Math.ceil(this.totalItems / this.itemsPerPage);
  //   }
  //
  //   changePage(page: number): void {
  //     if (page >= 1 && page <= this.totalPages) {
  //       this.currentPage = page;
  //       this.pageChanged.emit(page);
  //     }
  //   }


  // protected readonly localStorage = localStorage;
  setIndex(i: number) {
    this.currentIndex=i;
    debugger;

  }

  decreaseQuantity(i: number) {
    debugger;
    if (this.cart[i].product.quantity > 1) {
      this.cart[i].product.quantity--;
      this.calculateSubtotal();
      // Decrease quantity, ensuring it doesn't go below 1
  }else{
   
      }

    //this.cart[i].product.quantity=Number(this.cart[i].product.quantity)-1;
  }
  increaseQuantity(i: number) {
    this.cart[i].product.quantity=Number(this.cart[i].product.quantity)+1;
    this.calculateSubtotal();

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


