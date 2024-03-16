import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ConstantsService} from "../services/constants/constants.service";
import {ApiCallingServiceService} from "../services/api-calling/api-calling-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit{
  // @ViewChild('image') imageElement: ElementRef;
  categories:any;
  products: any;

  constructor(private cons:ConstantsService,
              private apiService: ApiCallingServiceService,
              private router: Router) {
  }

  ngOnInit(): void {this.getAllCategories();
    this.getAllProduct();
  }
  private getAllCategories() {
    this.apiService.getApiWithToken(this.cons.api.getAllCategories).subscribe(
      (response: object) => {
        let result: { [key: string]: any } = response;
        this.categories=result['response'];
        debugger;
      },
      (error) => {
        console.error('Add Product failed:', error);
      }
    );
  }

  private getAllProduct() {
    this.apiService.getApiWithToken(this.cons.api.getAllProducts).subscribe(
      (response: object) => {
        let result: { [key: string]: any } = response;
        this.products=result['response'];
        debugger;
        for(let product of this.products){
          product.imageUrl=this.cons.serviceUrl+product.imageUrl;

        }
      },
      (error) => {
        console.error('Add Product failed:', error);
      }
    );
  }

  addToCart(product:any) {
    debugger;
    this.apiService.getApiWithToken(this.cons.api.addToCart+'/'+product.productId).subscribe(
      (response: object) => {
        let result: { [key: string]: any } = response;
        this.products=result['response'];
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
}
