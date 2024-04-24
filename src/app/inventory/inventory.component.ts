import { CommonService } from './../services/common/common.service';

import { Component, OnInit } from '@angular/core';


import { ConstantsService } from '../services/constants/constants.service';
import { ApiCallingServiceService } from '../services/api-calling/api-calling-service.service';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared/shared.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent  implements OnInit{
  groccery: boolean =true;
  private cardType: string='';
  products: any;
  categories: any;
  categoriesSorted:any[]=[];
  filteredProducts: any;
  

  constructor(public cons:ConstantsService,
    private apiService: ApiCallingServiceService,
    private router: Router,
    private sharedService: SharedService,
  private CommonService:CommonService) { }

  selectedCategory: string = '';
  
  
  ngOnInit(): void {
    this.getAllProduct();
    this.getcategories();
    
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
        console.log(this.products);
              
      },
      (error) => {
        console.error('Add Product failed:', error);
      }
    );
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

  filterProductsByCategory() {
    debugger;
    if (this.selectedCategory !== 'Filter By Category') {
      // Filter products only if a valid category is selected
      this.filteredProducts = this.products.filter((product: { categoryName: string; }) => product.categoryName === this.selectedCategory);
    } else {
      // If 'Filter By Category' is selected, display all products
      this.filteredProducts = this.products;
    }
  }



  
 
  
  
 

}
