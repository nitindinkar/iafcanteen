import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { ConstantsService } from '../services/constants/constants.service';
import { ApiCallingServiceService } from '../services/api-calling/api-calling-service.service';
import { SharedService } from '../services/shared/shared.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.scss'
})
export class MyAccountComponent implements OnInit{
[x: string]: any;

  showRegistrationForm: boolean = false;
  showLoginForm: boolean = true;
  accountDetails: any;
  parsedLoginResponse: any;
  orderDetails: any;

  constructor(private cons:ConstantsService,
    private apiService: ApiCallingServiceService,
    private router: Router,
    private sharedService: SharedService) {
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
    this.apiService.getApiWithToken(this.cons.api.getOrderDetails).subscribe(
      (response: object) => {
        let result: { [key: string]: any } = response;
        this.orderDetails=result['response'];
        console.log(this.orderDetails);

        this.orderDetails = this.orderDetails.filter((order: { user: { id: any; }; }) => order.user.id === this.parsedLoginResponse.user.id);

          // Reverse the order of the filtered array
           this.orderDetails.reverse();

        console.log("user id 1 wali hai...."+this.orderDetails)
        
      },
      (error) => {
        console.error('Add Product failed:', error);
      }
      
    );

  }

  userOrderCancel(i: number, orderId: any){
    console.log(orderId);
    
    

    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to Cancel this order. This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Cancel it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed, proceed with order deletion
        debugger;
        this.apiService.getApiWithToken(this.cons.api.userCancelOrder + '/' + orderId).subscribe(
          (response: object) => {
            // Order deleted successfully, remove it from the orderDetails list
            this.orderDetails.splice(i, 1);
            // Show success message
            Swal.fire(
              'Order Cancelled!',
              'The order has been deleted.',
              'success'
            );
          },
          (error: any) => {
            // Error handling if deletion fails
            console.error('Cancel order failed:', error);
            // Show error message
            Swal.fire(
              'Error!',
              'Failed to Cancel the order.',
              'error'
            );
          }
        );
      }
    });
  }

  
}
