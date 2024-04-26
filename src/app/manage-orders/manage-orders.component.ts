import { Component } from '@angular/core';
import { ConstantsService } from '../services/constants/constants.service';
import { ApiCallingServiceService } from '../services/api-calling/api-calling-service.service';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { OrderDetailsDialogComponent } from '../order-details-dialog/order-details-dialog.component';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrl: './manage-orders.component.scss'
})
export class ManageOrdersComponent {



  showRegistrationForm: boolean = false;
  showLoginForm: boolean = true;
  accountDetails: any;
  parsedLoginResponse: any;
  orderDetails: any;
  searchQuery: string = ''; 
  filteredOrders: any[] = [];

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
        this.filteredOrders = this.orderDetails;
        console.log(this.orderDetails);

       
        
      },
      (error) => {
        console.error('Add Product failed:', error);
      }
      
    );

  }

  openOrderDetailsDialog(orderId: string): void {
    debugger;
    // Fetch the details of the selected order based on its ID
    this.apiService.getApiWithToken(this.cons.api.getOrderDetailsById+'/'+orderId).subscribe(
      (orderDetails: any) => {
        // Open the dialog with the fetched order details
        const dialogRef = this.dialog.open(OrderDetailsDialogComponent, {
          width: '600px',
          
          data: { order: orderDetails } // Pass the fetched order details to the dialog
        });
  
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
      },
      (error: any) => {
        console.error('Failed to fetch order details:', error);
      }
    );
  }

 

  adminOrderDelete(i: number, orderId: any) {
    // Show a confirmation dialog using SweetAlert
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this order. This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed, proceed with order deletion
        this.apiService.deleteApiWithToken(this.cons.api.adminDeleteOrder + '/' + orderId).subscribe(
          (response: object) => {
            // Order deleted successfully, remove it from the orderDetails list
            this.orderDetails.splice(i, 1);
            // Show success message
            Swal.fire(
              'Deleted!',
              'The order has been deleted.',
              'success'
            );
          },
          (error: any) => {
            // Error handling if deletion fails
            console.error('Delete order failed:', error);
            // Show error message
            Swal.fire(
              'Error!',
              'Failed to delete the order.',
              'error'
            );
          }
        );
      }
    });
  }

  searchOrders() {
    this.filteredOrders = this.orderDetails.filter((order: { orderId: string | string[]; user: { name: string; }; }) => 
      order.orderId.includes(this.searchQuery) || order.user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
  
    
    }
  




  

  




