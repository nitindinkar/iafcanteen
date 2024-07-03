import { Component } from '@angular/core';
import { ConstantsService } from '../services/constants/constants.service';
import { ApiCallingServiceService } from '../services/api-calling/api-calling-service.service';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { OrderDetailsDialogComponent } from '../order-details-dialog/order-details-dialog.component';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrl: './manage-orders.component.scss',
})
export class ManageOrdersComponent {
  showRegistrationForm: boolean = false;
  showLoginForm: boolean = true;
  accountDetails: any;
  parsedLoginResponse: any;
  orderDetails: any;
  searchQuery: string = '';
  filteredOrders: any[] = [];
  pdfDownload: any;
  selectedOrder: any;
  slideToggleValue: any;

  constructor(
    private cons: ConstantsService,
    private apiService: ApiCallingServiceService,
    private router: Router,
    private sharedService: SharedService,
    public dialog: MatDialog,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
  ) {}
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
    tabs.forEach((tab) => {
      tab.classList.remove('active');
    });

    // Add 'active' class to url: any, p0: { responseType: string; }ked tab
    const clickedTab = event.target as HTMLElement;
    clickedTab.parentElement?.classList.add('active');
  }
  changeInputType(target: EventTarget | null) {
    if (target instanceof HTMLInputElement) {
      const inputField = target as HTMLInputElement;
      inputField.setAttribute('type', 'date');
      // Remove the focus event listener to prevent subsequent changes
      inputField.removeEventListener('focus', () =>
        this.changeInputType(target)
      );
    }
  }

  myAccount() {
    var loginResponse = this.sharedService.loginResponse;
    if (typeof loginResponse === 'string') {
      this.parsedLoginResponse = JSON.parse(loginResponse);
    }
  }

  order() {
    this.spinner.show();
    this.apiService.getApiWithToken(this.cons.api.getAdminOrders).subscribe(
      (response: object) => {
        let result: { [key: string]: any } = response;
        this.orderDetails = result['response'];

        // this.orderDetails.sort((a: { orderDate: string | number | Date; }, b: { orderDate: string | number | Date; }) => {
        //   return new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime();
        // });
        this.orderDetails.reverse();
        this.filteredOrders = this.orderDetails;
        console.log(this.orderDetails);
        this.spinner.hide();
      },
      (error) => {
        console.error('Add Product failed:', error);
        this.spinner.hide();
      }
    );
  }

  openOrderDetailsDialog(orderId: string): void {
    debugger;
    // Fetch the details of the selected order based on its ID
    this.apiService
      .getApiWithToken(this.cons.api.getOrderDetailsById + '/' + orderId)
      .subscribe(
        (orderDetails: any) => {
          // Open the dialog with the fetched order details
          const dialogRef = this.dialog.open(OrderDetailsDialogComponent, {
            width: '600px',

            data: { order: orderDetails }, // Pass the fetched order details to the dialog
          });

          dialogRef.afterClosed().subscribe((result) => {
            console.log('The dialog was closed');
          });
        },
        (error: any) => {
          console.error('Failed to fetch order details:', error);
        }
      );
  }

  adminOrderDelete(i: number, orderId: number) {
    const order = this.orderDetails.find(
      (order: { id: number; status: string }) => order.id === orderId
    );

    // Check if the order exoists and if its status is 'Delivered'
    if (order && order.orderStatus === 'DELIVERED') {
      // If the order is delivered, display an error message and return
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'This order has already been delivered and cannot be cancelled.',
      });
      return;
    }
    debugger;
    console.log('this is order is of admn' + orderId);
    // Show a confirmation dialog using SweetAlert
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to Cancel this order. This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Cancel it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed, proceed with order deletion
        debugger;
        this.apiService
          .getApiWithToken(this.cons.api.adminDeleteOrder + '/' + orderId)
          .subscribe(
            (response: object) => {
              // Order deleted successfully, remove it from the orderDetails list
              this.orderDetails.splice(i, 1);
              // Show success message
              Swal.fire('Cancelled!', 'The order has been Cancel.', 'success');
              this.order();
            },
            (error: any) => {
              // Error handling if deletion fails
              console.error('Cancel order failed:', error);
              // Show error message
              Swal.fire('Error!', 'Failed to delete the order.', 'error');
            }
          );
      }
    });
  }

  searchOrders() {
    this.filteredOrders = this.orderDetails.filter(
      (order: { orderId: string | string[]; user: { name: string } }) =>
        order.orderId.includes(this.searchQuery) ||
        order.user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // downloadPDF(pdfUrl: string) {
  //   debugger;
  //   this.http.get(pdfUrl, { responseType: 'blob' }).subscribe((response: any) => {
  //     const blob = new Blob([response], { type: 'application/pdf' });
  //     const url = window.URL.createObjectURL(blob);
  //     const a = document.createElement('a');
  //     document.body.appendChild(a);
  //     a.href = url;
  //     a.download = 'order.pdf';
  //     a.click();
  //     window.URL.revokeObjectURL(url);
  //     document.body.removeChild(a);
  //   });
  // }

  downloadPdf(orderId: any) {
    debugger;
    this.apiService
      .getApiWithToken(this.cons.api.downloadPdf + '/' + orderId)
      .subscribe(
        (response: object) => {
          let result: { [key: string]: any } = response;
          this.pdfDownload = result['response'][0];
          this.downloadPdfUrl(this.pdfDownload, 'report.pdf');
        },
        (error) => {
          console.error('Add Product failed:', error);
        }
      );
  }
  downloadPdfUrl = (url: string, fileName: string) => {
    // Create an anchor element
    const link = document.createElement('a');
    // Set the href attribute to the PDF URL
    link.href = url;
    // Set the download attribute to specify the file name
    link.download = fileName;
    // Trigger a click event on the anchor element
    link.click();
  };

  delivered(i: number, deliverOrderId: number) {
    debugger;
    // Check if the order status is 'Cancelled'
    const order = this.orderDetails.find(
      (order: { id: number }) => order.id === deliverOrderId
    );
    if (order && order.orderStatus === 'CANCELLED') {
      // If the order is cancelled, display an error message
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'This order has already been cancelled and cannot be marked as delivered.',
      });
      return; // Exit the method
    }

    this.apiService
      .getApiWithToken(this.cons.api.markDelivered + '/' + deliverOrderId)
      .subscribe(
        (response: object) => {
          let result: { [key: string]: any } = response;

          Swal.fire({
            icon: 'success',
            title: 'Order Delivered',
            text: 'The order has been marked as delivered successfully.',
          });

          this.order();
        },
        (error) => {
          console.error('Add Product failed:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to mark order as delivered. Please try again later.',
          });
        }
      );
  }

  viewOrderDetails(id: any, order: any) {
    this.selectedOrder = order;
    console.log(this.selectedOrder);
  }

  handleSlideToggleChange() {
    if (this.slideToggleValue) {
      // If slide toggle is true
      console.log('Slide toggle is true');
      // Add your logic for true state here
    } else {
      // If slide toggle is false
      console.log('Slide toggle is false');
      // Add your logic for false state here
    }
  }
}
