
import { CommonService } from './../services/common/common.service';
import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartItem, registerables } from 'chart.js';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiCallingServiceService } from '../services/api-calling/api-calling-service.service';
import { ConstantsService } from '../services/constants/constants.service';
import { SharedService } from '../services/shared/shared.service';

@Component({
  selector: 'app-superadmin-dashboard',
  templateUrl: './superadmin-dashboard.component.html',
  styleUrl: './superadmin-dashboard.component.scss'
})
export class SuperadminDashboardComponent implements OnInit{
  actveStore: any;
  totalStoreCount: any;
  activeAdminsCount: any;
  totalAdminCount: any;
  activeCompletionPercentage: any;
  activeStoreCompletionPercentage: any;
  activeStore: any;
  totalAdminCompletionPercentage: any;
  totalStoreCompletionPercentage: any;
  deactiveAdminCount:any;
  deactvateStoreCount: any;
  activeAdminsCountModified: any;
  allAdmins: any;
  activeAdminCount: any;
  inactiveAdminCount: any;


  constructor(
    private router: Router,
    private http: HttpClient,
    private apiService: ApiCallingServiceService,
    private cons: ConstantsService,
    private sharedService: SharedService,
  ) {}
  
  ngOnInit(): void {
    if(this.sharedService.loggedIn == true){
      window.location.reload();
    }
    this.getActiveStoreCount();
    // this.getActiveAdminsCount();
    this.getAllActiveAdmins();
    this.getTotalStoreCount();
    this.getTotalAdminCount();
    this.getAllAdminsDetails();

    this.charts();
  }

  public async  charts() {

    const activeAdmins = await this.apiService.getApiWithToken(this.cons.api.getActiveAdmins).toPromise();
    const activeStores = await this.apiService.getApiWithToken(this.cons.api.getActiveStoreCount).toPromise();
    const totalAdmins = await this.apiService.getApiWithToken(this.cons.api.getTotalAdminsCount).toPromise();
    const totalStore = await this.apiService.getApiWithToken(this.cons.api.getTotalStoreCount).toPromise();
    const getAllAdmins=await this.apiService.getApiWithToken(this.cons.api.getAllAdmins).toPromise();
   
debugger;
    //this.deactiveAdminCount=this.totalAdminCount-this.activeAdminsCount;
    this.deactvateStoreCount=this.totalStoreCount-this.activeStore;
    console.log(this.deactiveAdminCount);
    console.log(this.deactvateStoreCount);
    Chart.register(...registerables);


    const data = {
      labels: ['Active Admins ', 'Deactive Admins ', 'Active Stores', 'Deactive Stores','Total Admins'],
      datasets: [{
        data: [this.activeAdminCount,this.inactiveAdminCount , this.activeStore, this.deactvateStoreCount, this.totalAdminCount],
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
  labels:['Active Admins ', 'Deactive Admins ', 'Active Stores', 'Deactive Stores','Total Admins'],
  datasets:[{
    data: [this.activeAdminCount,this.inactiveAdminCount , this.activeStore, this.deactvateStoreCount, this.totalAdminCount],
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

getActiveStoreCount(){
  debugger;
 
    this.apiService.getApiWithToken(this.cons.api. getActiveStoreCount).subscribe(
      (response: object) => {
        let result: { [key: string]: any } = response;
        this.activeStore=result['response'];
        console.log(this.actveStore);
        this.calculateActiveStore();
        
      },
      (error) => {
        console.error('Add Product failed:', error);
      }
    );
  
 
}

// getActiveAdminsCount(){
 
//   this.apiService.getApiWithToken(this.cons.api.getActiveAdminCount).subscribe(
//     (response: object) => {
//       let result: { [key: string]: any } = response;
//       this.activeAdminsCount=result['response'];
//       console.log(this.activeAdminsCount);
//       this.calculateActiveCompletionPercentage();
      
//     },
//     (error) => {
//       console.error('Add Product failed:', error);
//     }
//   );


// }

getTotalStoreCount(){
 
  this.apiService.getApiWithToken(this.cons.api.getTotalStoreCount).subscribe(
    (response: object) => {
      let result: { [key: string]: any } = response;
      this.totalStoreCount=result['response'];
      console.log(this.actveStore);
      this.calculateTotalStore();
      
    },
    (error) => {
      console.error('Add Product failed:', error);
    }
  );


}

getTotalAdminCount(){
 
  this.apiService.getApiWithToken(this.cons.api.getTotalAdminsCount).subscribe(
    (response: object) => {
      let result: { [key: string]: any } = response;
      this.totalAdminCount=result['response'];
      console.log(this.actveStore);
      this.calculateTotalAdmins();
      
    },
    (error) => {
      console.error('Add Product failed:', error);
    }
  );


}




calculateActiveCompletionPercentage(): void {
    this.activeCompletionPercentage = (this.activeAdminsCount / 100) * 100;
}

calculateActiveStore(): void {
    this.activeStoreCompletionPercentage = (this.activeStore / 100) * 100;
}

calculateTotalAdmins(): void {
    this.totalAdminCompletionPercentage = (this.totalAdminCount / 100) * 100;
}

calculateTotalStore(): void {
    this.totalStoreCompletionPercentage = (this.totalStoreCount / 100) * 100;
}

getAllActiveAdmins() {
  this.apiService.getApiWithToken(this.cons.api.getActiveAdmins).subscribe(
    (response: object) => {
      let result: { [key: string]: any } = response;
      console.log(result);
      this.activeAdminsCount = result['response'].length;
      this.calculateActiveCompletionPercentage();
    },
    (error) => {
      console.error('Add Product failed:', error);
    }
  );
}


// get admin details 

// getAllAdminsDetails(){
//   this.apiService.getApiWithToken(this.cons.api.getAllAdmins).subscribe(
//     (response: object) => {
//       let result: { [key: string]: any } = response;
//       this.allAdmins=result['response']; 
           
//     },
//     (error) => {
//       console.error('Add Product failed:', error);
//     }
//   );
// }

getAllAdminsDetails(){
  this.apiService.getApiWithToken(this.cons.api.getAllAdmins).subscribe(
    (response: any) => {
      let admins: any[] = response.response;
      // Initialize counters
      let activeCount = 0;
      let inactiveCount = 0;
      
      // Iterate through admins
      admins.forEach(admin => {
        if (admin.active) {
          activeCount++;
        } else {
          inactiveCount++;
        }
      });
      
      // Store the counts in class properties
      this.activeAdminCount = activeCount;
      this.inactiveAdminCount = inactiveCount;
    },
    (error) => {
      console.error('Fetching admins failed:', error);
    }
  );
}






}
