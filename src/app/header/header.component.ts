import { Component, OnInit } from '@angular/core';
import { ConstantsService } from '../services/constants/constants.service';
import { ApiCallingServiceService } from '../services/api-calling/api-calling-service.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import {SharedService} from "../services/shared/shared.service";
import {ProductComponent} from "../product/product.component";

@Component({
  selector: 'app-header',
  templateUrl:'./header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  categories: any;
  //loggedIn: any;

   loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  selectedCategory: string | undefined;
  products: any;
  public cartCount: string | null=localStorage.getItem('cartCount');



  constructor(private cons:ConstantsService,
              private apiService: ApiCallingServiceService,
              private router: Router,
              public sharedService:SharedService,
              private productComp:ProductComponent) {
}

  ngOnInit(): void {
    this.getcategories();
    this.getCartItems();
  }

  getcategories(){

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

  filterProductsByCategory(category: string) {
    this.selectedCategory = category;
}

// Method to get filtered products
getFilteredProducts() {
  return this.products.filter((product: { category: string; }) => {
      // If no category selected or product's category matches the selected category
      return !this.selectedCategory || product.category === this.selectedCategory;
  });
}

private getAllProduct() {
  this.apiService.getApiWithToken(this.cons.api.getAllProducts).subscribe(
    (response: object) => {
      let result: { [key: string]: any } = response;
      this.products=result['response'];
      this.products.forEach((product: any) => {
        product.image= 'data:image/jpeg;base64,'+product.image;
      });
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

  logout() {
    // Call your authentication service logout method
    localStorage.removeItem('token');
    localStorage.removeItem('loginResponse');
    this.sharedService.loginResponse=null;
    this.loggedIn.next(false);
    this.router.navigateByUrl('');

  }
  login(){
    this.loggedIn.next(true);
  }


  redirect(cat: any) {
    this.sharedService.selectedCategory=cat;
    if(this.router.url=='/product'){
      this.productComp.getAllProduct();
    }
    else
      this.router.navigateByUrl('/product');

  }

  private getCartItems() {
    this.cartCount;
    this.apiService.getApiWithToken(this.cons.api.getCartDetailsOfUser).subscribe(
      (response: object) => {
        let result: { [key: string]: any } = response;
        this.cartCount=result['response'].length;
        localStorage.setItem('cartCount',result['response'].length);
        debugger;
      },
      (error) => {
        console.error('Add Product failed:', error);
      }
    );
  }
}


