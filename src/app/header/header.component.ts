import { ProductComponent } from './../product/product.component';
import { SharedService } from './../services/shared/shared.service';
import { Component, OnInit } from '@angular/core';
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
  public cartCount: string | null=localStorage.getItem('cartCount');
  loginResponse: any;
  products2: any;
  groccery: boolean=true;
  private cardType: string='';
  filterProducts: any;
  filteredProducts: any[] | undefined;


  constructor(private cons:ConstantsService,
              private apiService: ApiCallingServiceService,
              private router: Router,
              public sharedService:SharedService,
              private productComp:ProductComponent,
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
        if(role.roleName=='ADMIN')
          this.admin=true;
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
    localStorage.removeItem('token');
    localStorage.removeItem('loginResponse');
    localStorage.removeItem('card');
    this.sharedService.loginResponse=null;
    this.sharedService.cardType=undefined;
    this.sharedService.selectedCategory=undefined;
    this.loggedIn.next(false);
    this.router.navigateByUrl('');
    this.admin=false;
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
    this.apiService.getApiWithToken(this.cons.api.getCartDetailsOfUser+'/'+this.cardType).subscribe(
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



