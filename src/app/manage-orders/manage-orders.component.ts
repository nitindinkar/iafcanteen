import { Component } from '@angular/core';
import { ConstantsService } from '../services/constants/constants.service';
import { ApiCallingServiceService } from '../services/api-calling/api-calling-service.service';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { OrderDetailsDialogComponent } from '../order-details-dialog/order-details-dialog.component';




@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrl: './manage-orders.component.scss'
})
export class ManageOrdersComponent {
searchOrders() {
throw new Error('Method not implemented.');
}

  showRegistrationForm: boolean = false;
  showLoginForm: boolean = true;
  accountDetails: any;
  parsedLoginResponse: any;
  orderDetails: any;

  constructor(private cons:ConstantsService,
    private apiService: ApiCallingServiceService,
    private router: Router,
    private sharedService: SharedService,
    public dialog: MatDialog) {
}
  ngOnInit(): void {
    
    $.getScript('../../assets/js/bootstrap.min.js');
    const defaultTab = document.querySelector('.nav-tabs li:first-child');
    defaultTab?.classList.add('active');

    this.myAccount();
    this.order();

  }

  setActiveTab(event: MouseEvent) {
    // Remove 'active' class from all tabs
    const tabs = document.querySelectorAll('.nav-tabs li');
    tabs.forEach(tab => {
      tab.classList.remove('active');
    });

    // Add 'active' class to the clicked tab
    const clickedTab = event.target as HTMLElement;
    clickedTab.parentElement?.classList.add('active');
  }
  changeInputType(target: EventTarget | null) {
    if (target instanceof HTMLInputElement) {
      const inputField = target as HTMLInputElement;
      inputField.setAttribute('type', 'date');
      // Remove the focus event listener to prevent subsequent changes
      inputField.removeEventListener('focus', () => this.changeInputType(target));
    }
  }
  

  myAccount(){
    var loginResponse = this.sharedService.loginResponse;
       if (typeof loginResponse === 'string') {
    this.parsedLoginResponse = JSON.parse(loginResponse);
    
    }
  }



  order(){
    this.apiService.getApiWithToken(this.cons.api.getAdminOrders).subscribe(
      (response: object) => {
        let result: { [key: string]: any } = response;
        this.orderDetails=result['response'];
       
        // this.orderDetails.sort((a: { orderDate: string | number | Date; }, b: { orderDate: string | number | Date; }) => {
        //   return new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime();
        // });
        this.orderDetails.reverse();
        console.log(this.orderDetails);

       
        
      },
      (error) => {
        console.error('Add Product failed:', error);
      }
      
    );

  }

  openOrderDetailsDialog(order: any): void {
    const dialogRef = this.dialog.open(OrderDetailsDialogComponent, {
      width: '900px',
      height: '1200px',
      data: { order: order }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
}
}

  

  




