import { Component, OnInit } from '@angular/core';
import { ConstantsService } from '../services/constants/constants.service';
import { ApiCallingServiceService } from '../services/api-calling/api-calling-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  categories: any;
  products: any;

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllProduct();
    
  }

  constructor(private cons:ConstantsService,
    private apiService: ApiCallingServiceService,
    private router: Router) {
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

  private getAllProduct() {
    this.apiService.getApiWithToken(this.cons.api.getAllProducts).subscribe(
      (response: object) => {
        let result: { [key: string]: any } = response;
        this.products=result['response'];
       
        for(let product of this.products){
          product.imageUrl=this.cons.serviceUrl+product.imageUrl;

        }
      },
      (error) => {
        console.error('Add Product failed:', error);
      }
    );
  }

}
