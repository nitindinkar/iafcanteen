import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import { ConstantsService } from '../services/constants/constants.service';
import { ApiCallingServiceService } from '../services/api-calling/api-calling-service.service';
import { SharedService } from '../services/shared/shared.service';




@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit{



  // @ViewChild('image') imageElement: ElementRef;
  categories:any;
  products: any;
  products2: any;
  viewProducts: any;
  // pageNumber: number = 1;
  // pageSize: number=6;
  // searchKey: string = '';
  // displayedCategories: any[] = [];

  // itemsPerPage: number = 5;

  // pages: any;
  // totalItems: any;
  // currentPage: any;
  // pageChanged: any;



  p: number = 1;
  constructor(public cons:ConstantsService,
              private apiService: ApiCallingServiceService,
              private router: Router,
              private sharedService: SharedService) {
  }

  ngOnInit(): void {
    debugger;
    if(localStorage.getItem('card')==this.cons.constants.liquorCard){
      this.sharedService.selectedCategory={id:8};
      // console.log("this is shared service "+this.sharedService.selectedCategory);
      // console.log(localStorage.getItem('card'));
      // console.log(this.cons.constants.liquorCard);
    }
    this.getAllProduct();
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
    // const params = {
    //   pageNumber: this.pageNumber,
    //   pageSize: this.pageSize,
    //   searchKey: this.searchKey

    // };


    this.apiService.getApiWithToken(this.cons.api.getAllProducts).subscribe(
      (response: object) => {
        let result: { [key: string]: any } = response;
        this.products=result['response'];


        this.products.forEach((product: any) => {
        product.image= 'data:image/jpeg;base64,'+product.image;
        });


        for(let product of this.products){
          product.imageUrl=this.cons.serviceUrl+product.imageUrl;

        }
        this.products2=this.products;
        this.getAllCategories();
      },
      (error) => {
        console.error('Add Product failed:', error);
      }
    );
  }




  addToCart(product:any) {
    debugger;

    if (product.isInCart) {
      alert("Product is already in the cart!");
      return; // Exit the function to prevent further execution
    }

    this.apiService.getApiWithToken(this.cons.api.addToCart+'/'+product.productId).subscribe(
      (response: object) => {
        let result: { [key: string]: any } = response;
        this.products=result['response'];

        if(result['status']==200){
          debugger;
          alert("Product added successfully");

          //this.showSnackBar('Product added to cart successfully.');
          product.isInCart = true;
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
        if(result['status']==200){

          alert("Product added successfully");
          }else{
          alert("Product not added");
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
          if(prod.dto.categoryId==cat.id){
            this.products2.push(prod);
          }
        }
      }
    }
    debugger;
    if(count == 0){
      this.products2=this.products;
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
}


