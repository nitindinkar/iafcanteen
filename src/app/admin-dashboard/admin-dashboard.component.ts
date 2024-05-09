import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartItem, registerables } from 'chart.js';
import { SharedService } from '../services/shared/shared.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiCallingServiceService } from '../services/api-calling/api-calling-service.service';
import { ConstantsService } from '../services/constants/constants.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  
  groccery: any;
  cardType: any;
  products: any;
  filteredProducts: any;
  totalProduct:any;
  categories: any;
  totalCategory: any;
  orderDetails: any;
  filteredOrders: any;
  totalOrder: any;
  cancelledOrdersPercentage: any;
  orderCompletionPercentage: any;
  categoryCompletionPercentage: any;
  productCompletionPercentage: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private apiService: ApiCallingServiceService,
    private cons: ConstantsService,
    private sharedService:SharedService
  ) {}
  ngOnInit(): void {
    if(this.sharedService.loggedIn == true){
      window.location.reload();
    }
    this.order();
    this.getAllProduct();
    this.getcategories();
    this.viewCharts();
    this.calculateCancelledOrdersPercentage();
 
  }
  
 


public getAllProduct() {
  debugger;
  if(localStorage.getItem('card')==this.cons.constants.liquorCard){
    this.groccery=false;
    this.cardType='L';
    }
  else{
    this.groccery=true;
    this.cardType='G'
  }
  this.apiService.getApiWithToken(this.cons.api.getAllProductAdmin).subscribe(
    (response: object) => {
      let result: { [key: string]: any } = response;
      this.products=result['response'];
      this.totalProduct=this.products.length;
      this.filteredProducts = this.products;
      this.calculateProductCompletionPercentage();
     
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
  this.totalCategory=this.categories.length; 
  console.log(this.totalCategory);
  this.filteredProducts = this.categories; 
  this.calculateCategoryCompletionPercentage();     
  console.log(this.filteredProducts);
  
},
(error) => {
  console.error('Add Product failed:', error);
}
);
}

order(){
  this.apiService.getApiWithToken(this.cons.api.getAdminOrders).subscribe(
    (response: object) => {
      let result: { [key: string]: any } = response;
      this.orderDetails=result['response'];
      this.totalOrder=this.orderDetails.length;
     
      // this.orderDetails.sort((a: { orderDate: string | number | Date; }, b: { orderDate: string | number | Date; }) => {
      //   return new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime();
      // });
      this.orderDetails.reverse();
      this.filteredOrders = this.orderDetails;
      this.calculateOrderCompletionPercentage();
      console.log(this.orderDetails);

     
      
    },
    (error) => {
      console.error('Add Product failed:', error);
    }
    
  );

}

public  async  viewCharts(){
  debugger;
    Chart.register(...registerables);
    const productsResponse = await this.apiService.getApiWithToken(this.cons.api.getAllProductAdmin).toPromise();
    const categoriesResponse = await this.apiService.getApiWithToken(this.cons.api.getAllCategories).toPromise();
    const ordersResponse = await this.apiService.getApiWithToken(this.cons.api.getAdminOrders).toPromise();
    
    const data = {
      labels: ['Total Products', 'Total Catagory', 'Total Orders', 'Delivered Order','Cancel Order'],
      datasets: [{       
        data: [this.totalProduct, this.totalCategory, this.totalOrder, 30, 20],
          backgroundColor: [
            '#1cc88a',
            '#4e73df',
            '#36b9cc',
            '#e74a3b',
            'rgb(248, 108, 107)',
          ],
          label:'E-URC'

        },
    ]
};
const options = {
  scales: {
    y: {
      beginAtZero: true,
      display: true
    }
  },
  legends:{
    display:false
  }
}
const config: ChartConfiguration = {
  type: 'bar',
  data: data,
  options: options
}
const chartItem: ChartItem = document.getElementById('my-chart') as ChartItem
new Chart(chartItem, config)



const data2 = {
  labels:['Total Products', 'Total Catagory', 'Total Orders', 'Delivered Order','Cancel Order'],
  datasets:[{
    data: [this.totalProduct, this.totalCategory, this.totalOrder, 30, 20],
    backgroundColor: [
      '#1cc88a',
            '#4e73df',
            '#36b9cc',
            '#e74a3b',
            'rgb(248, 108, 107)',
          ],
           fill: true,
  }]
};
const options2 = {
  scales: {
    y: {
      beginAtZero: true,
      display: false
    }
  },
}
const config2: ChartConfiguration = {
  type: 'polarArea',
  data: data2,
  options: options2
}
Chart.overrides.polarArea.plugins.legend.position = 'left';
Chart.overrides.polarArea.aspectRatio=1.4;
const chartItem2: ChartItem = document.getElementById('my-chart2') as ChartItem
new Chart(chartItem2, config2)

}



calculateCancelledOrdersPercentage(): void {
  this.cancelledOrdersPercentage = (20 /100) * 100;
}
calculateOrderCompletionPercentage(): void {
  this.orderCompletionPercentage = (this.totalOrder/ 100) * 100;
}
calculateCategoryCompletionPercentage(): void {
  this.categoryCompletionPercentage = (this.totalCategory / 100) * 100;
}
calculateProductCompletionPercentage(): void {
  // Assuming you have a total number of products available or a maximum value to represent
  const totalMaxProducts = 500; // Update this with your maximum product count
  this.productCompletionPercentage = (this.totalProduct / totalMaxProducts) * 100;
}
}
