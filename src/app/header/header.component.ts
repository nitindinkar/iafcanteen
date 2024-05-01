import { ProductComponent } from './../product/product.component';
import { SharedService } from './../services/shared/shared.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ConstantsService } from '../services/constants/constants.service';
import { ApiCallingServiceService } from '../services/api-calling/api-calling-service.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';



@Component({
  selector: 'app-header',
  templateUrl:'./header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

 
  categories: any;
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  selectedCategory: string | undefined;
  products: any;
  pageNumber:any;
  pageSize:any;
  searchKey: string = '';
  admin:boolean=false;
  user:boolean=false;
  loginResponse: any;
  products2: any;
  groccery: boolean=true;
  private cardType: string='';
  filterProducts: any;
  filteredProducts: any[] | undefined;
  wishResponse: any;
  cartItems: any;  
  totalAmount: any;
  cart: any;
  subtotal: any;
  cartEmpty:boolean=false;
  superadmin:boolean=false;
  
  


  constructor(private cons:ConstantsService,
              private apiService: ApiCallingServiceService,
              private router: Router,
              public sharedService:SharedService,
              //private productComp:ProductComponent,
              ) {
}

  ngOnInit(): void {
    const storedData = localStorage.getItem('loginResponse');
    if (storedData) {
      this.loginResponse = JSON.parse(storedData);
      console.log(storedData);
      debugger;
      for(let role of this.loginResponse.user.roles){
        debugger;
        console.log(role.roleName);
        if(role.roleName=='ADMIN'){
          this.admin=true;
        } 
        if(role.roleName=='USER'){
          this.user=true;
        }
        if(role.roleName=="SUPER_ADMIN"){
          this.superadmin=true;
        }
      }
    }
    if(localStorage.getItem('card')==this.cons.constants.liquorCard){
      this.groccery=false;
      this.cardType='L'
      this.getCartItems();
      // this.sharedService.selectedCategory={id:8};
      // console.log("this is shared service "+this.sharedService.selectedCategory);
      // console.log(localStorage.getItem('card'));
      // console.log(this.cons.constants.liquorCard);
    }
    else{
      this.groccery=true;
      this.cardType='G'
      this.getCartItems();
    }
    this.getcategories();
    this.getWishList();
    
  

  }



  getcategories(){

    this.apiService.getApiWithToken(this.cons.api.getAllCategories).subscribe(
      (response: object) => {
        let result: { [key: string]: any } = response;
        this.categories=result['response'];
               
        for(let cat of this.categories){
          if(this.groccery&&cat.type=='G'){
            this.categoriesSorted.push(cat);
          }
          else if(!this.groccery&&cat.type=='L'){
            this.categoriesSorted.push(cat);
          }
        }
      },
      (error) => {
        console.error('Add Product failed:', error);
      }
    );
  }


  
 searchProducts(): void {
  debugger;
  if (this.router.url === '/product') {
        this.sharedService.searchKey = this.searchKey;
     
    }
     else{
    this.sharedService.searchKey = this.searchKey;
    this.router.navigate(['/product']);

     }
     
  }

  
// Method to get filtered products
  categoriesSorted:any[]=[];
  getFilteredProducts() {
  return this.products.filter((product: { category: string; }) => {
      // If no category selected or product's category matches the selected category
      return !this.selectedCategory || product.category === this.selectedCategory;
  });
}


  logout() {
    // Call your authentication service logout method
    debugger;
    localStorage.removeItem('token');
    localStorage.removeItem('loginResponse');
    localStorage.removeItem('card');
    localStorage.removeItem('cartCount');
    localStorage.removeItem('cartItems');
    localStorage.clear();
    this.sharedService.loginResponse=null;
    this.sharedService.cardType=undefined;
    this.sharedService.selectedCategory=undefined;
    this.loggedIn.next(false);
    this.router.navigateByUrl('');
    this.admin=false;
    this.user=false;
  
    
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
  login(){
    this.loggedIn.next(true);
  }


  redirect(cat: any) {
    this.sharedService.selectedCategory=cat;
    if(this.router.url=='/product'){
      this.getAllProduct();
    }
    else
      this.router.navigateByUrl('/product');

  }

  private getCartItems() {
    
    this.sharedService.cartCount;
    this.apiService.getApiWithToken(this.cons.api.getCartDetailsOfUser+'/'+this.cardType).subscribe(
      (response: object) => {
        debugger
        let result: { [key: string]: any } = response;
        this.cartItems=result['response'];
       
        if(result['response']=="exception No products found in the cart for the user"){
          this.sharedService.cartCount=0;
          this.cartEmpty=true;
          
        }else{
          debugger;
          this.sharedService.cartCount=result['response'].length;
          this.cartEmpty=false;

        }
       
      },
      (error) => {
        console.error('Add Product failed:', error);
      }
    );
  }

  getWishList(){
    debugger;
  this.apiService.getApiWithToken(this.cons.api.getWishList).subscribe(
    (response: object) => {
      let result: { [key: string]: any } = response;

      if(result['response']==0){
        this.sharedService.wishListCount=0;
      }else{
        this.sharedService.wishListCount=result['response'].length;
      }
         
      //   

    },
    (error: any) => {
      console.error('Add wishlist failed:', error);
    }
  );
  }

  
}









