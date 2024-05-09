import { SharedService } from './../services/shared/shared.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallingServiceService } from '../services/api-calling/api-calling-service.service';
import { ConstantsService } from '../services/constants/constants.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import * as FileSaver from 'file-saver';





@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  fullName: any;
  fullAddress: any;
  contactNumber: any;
  alternateContactNumber: any;
  flag: boolean = false;
  cart: any;
  subtotal: any | Number;
  public cartTotal: any;
  public  cartItems: any;
  showAddAddressForm: boolean = false;
  display:Boolean=false;
  private cardType: string='';
  pincode: any;
  selectedSavedAddress: any;
  savedAddresses: any;
  showSubmit:Boolean=true;
  selectedAddressType: any;
  state: any;
  city: any;
  area: any;
  flatNumberOrHouseNumber: any;
  showAdditionalFields: boolean=false;
  landMark: any;
  addressType: any;
  userId: any;
  showSelectSlot: boolean = false;
  minDate:String|any;
  pinCode: any;
  orderId: any;
  pdfDownloadUrl: any;


  constructor(
    private router: Router,
    private http: HttpClient,
    private apiService: ApiCallingServiceService,
    private cons: ConstantsService,
    private sharedService:SharedService
  ) {
    this.minDate = new Date().toISOString().split('T')[0];
  }

  toggleAddAddressForm() {
    this.showAddAddressForm = !this.showAddAddressForm;
    //this.showSubmit=false;
    this.selectedSavedAddress=null;
    this.showSubmit = !this.showAddAddressForm;
  }

  ngOnInit(): void {

    this.getAddress();

    if(localStorage.getItem('card')==this.cons.constants.liquorCard) {
      this.cardType = 'L';
      this.getCartDetails();
    }else{
      this.cardType = 'G';
      this.getCartDetails();
    }
    this.cartItems=this.sharedService.cart;
    this.cartTotal=this.sharedService.cartTotal;

  }


  // bookOrder(){

  //   const orderProductQuantityList = [];


  //   if (this.cartItems) {
  //   for (let cart of this.cartItems) {
  //     // Extract productId and quantity for the current item
  //     const productId = cart.product.productId;
  //     const quantity = cart.product.quantity;

  //     // Push the productId and quantity to the productQuantityList array
  //     orderProductQuantityList.push({ productId: productId, quantity: quantity });
  //   }
  //  }

  //  const selectedSavedAddressIndex = 0; // Adjust as needed

  //  if (this.savedAddresses && this.savedAddresses.length > selectedSavedAddressIndex) {
  //      const selectedAddress = this.savedAddresses[selectedSavedAddressIndex];

  //   this.flag=true;
  //   const billingData = {
  //     fullName: this.sharedService.userName, // Use the fullName from the selected address
  //     fullAddress: selectedAddress.flatNumberOrHouseNumber + ', ' + selectedAddress.area + ', ' + selectedAddress.city + ', ' + selectedAddress.state + ', ' + selectedAddress.pinCode,
  //     contactNumber: selectedAddress.mobile, // Use the contactNumber from the selected address
  //     alternateContactNumber: selectedAddress.alternateContactNumber, // Use the alternateContactNumber from the selected address
  //     selectedStore: "Delhi",
  //     cardType: this.cardType,
  //     orderProductQuantityList
  // };
  //     console.log(billingData);

  //   this.apiService.postApiWithToken(this.cons.api.buyProduct+"/"+this.flag, billingData).subscribe({
  //     next: (v: object) => {
  //       debugger;
  //       let result: { [key: string]: any } = v;
  //       console.log(result['pdfUrl']);

  //       this.sharedService.cartCount=0;
  //       this.sharedService.cartList=[];

  //       if (result['message'] == 'success') {

  //          const pdfUrl = result['response']['pdfUrl'];
  //          console.log("the pdf url is ......."+pdfUrl);
  //          const link = document.createElement('a');
  //          link.href = pdfUrl;
  //          link.download = 'report.pdf'; // You can specify any file name here
  //          link.target = '_blank'; // Open in a new tab if needed
  //          link.click();
  //       }
  //     },
  //     error: (e) => {

  //       console.error(e);
  //     },
  //     complete: () => console.log(),
  //   });
  // }else{
  //   console.error('No saved addresses found or selected address index is out of bounds.');
  // }


  // }



bookOrder() {
  debugger;
  const orderProductQuantityList = [];

  if (this.cartItems) {
    for (let cart of this.cartItems) {
      const productId = cart.product.productId;
      const quantity = cart.product.quantity;
      orderProductQuantityList.push({ productId: productId, quantity: quantity });
    }
  }

  const selectedSavedAddressIndex = 0; // Adjust as needed

  if (this.savedAddresses && this.savedAddresses.length > selectedSavedAddressIndex) {
    const selectedAddress = this.savedAddresses[selectedSavedAddressIndex];
    this.flag = true;
    debugger;
    const billingData = {

      fullName: this.sharedService.userName,
      fullAddress: selectedAddress.flatNumberOrHouseNumber + ', ' + selectedAddress.area + ', ' + selectedAddress.city + ', ' + selectedAddress.state + ', ' + selectedAddress.pinCode,
      contactNumber: selectedAddress.mobile,
      alternateContactNumber: selectedAddress.alternateContactNumber,
      selectedStore: "Delhi",
      cardType: this.cardType,
      orderProductQuantityList,
      storeId:52
    };

    this.apiService.postApiWithToken(this.cons.api.buyProduct + "/" + this.flag, billingData).subscribe({
      next: (v: object) => {
        let result: { [key: string]: any } = v;

        this.sharedService.cartCount = 0;
        this.sharedService.cartList = [];

        if (result['message'] == 'success') {
          const pdfUrl = result['response']['pdfUrl'];
          this.orderId=result['response']['orderId'];





          Swal.fire({
            title: 'Order Placed Successfully!',
            text: 'Your order has been placed successfully. Click OK to download your receipt.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              debugger;

              this.downloadPdf(pdfUrl, 'report.pdf');
            }
          });
        } else {
          Swal.fire({
            title: 'Order Failed',
            text: 'Oops! Something went wrong. Please try again later.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      },
      error: (e) => {
        console.error('An error occurred:', e);
        Swal.fire({
          title: 'Error',
          text: 'Oops! Something went wrong. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      },
      complete: () => console.log(),
    });
  } else {
    console.error('No saved addresses found or selected address index is out of bounds.');
    Swal.fire({
      title: 'Error',
      text: 'No saved addresses found or selected address index is out of bounds.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
}


downloadPdf = (url: string, fileName: string) => {
  // Create an anchor element
  const link = document.createElement('a');
  // Set the href attribute to the PDF URL
  link.href = url;
  // Set the download attribute to specify the file name
  link.download = fileName;
  // Trigger a click event on the anchor element
  link.click();
};


  getCartDetails(){
    debugger;

    this.apiService.getApiWithToken(this.cons.api.getCartDetailsOfUser+'/'+this.cardType).subscribe(
      (response: object) => {
        let result: { [key: string]: any } = response;
        this.cart=result['response'];

        for(let product of this.cart){
          product.product.quantity=1;
          console.log(product.product);

        }
        //this.calculateSubtotal();
      },
      (error) => {
        console.error('Add Product failed:', error);
      }
    );
  }
  calculateSubtotal() {
    this.subtotal = 0;
    debugger;
    if (this.cart && this.cart.length > 0) {
      for (let cartItem of this.cart) {
        if (cartItem.product && cartItem.product.quantity && cartItem.product.productDiscountedPrice) {
          this.subtotal += cartItem.product.quantity * cartItem.product.productDiscountedPrice;
        }
      }
    }
    console.log("This is my subtotal"+this.subtotal);
    return this.subtotal;
    }

    saveAddress(): void {

      const addressDetails = {
          flatNumberOrHouseNumber: this.flatNumberOrHouseNumber,
          landMark: this.landMark,
          area: this.area,
          city: this.city,
          state: this.state,
          addressType:  this.selectedAddressType,
          pinCode:this.pinCode,
          userId: this.sharedService.userId,
      };
       // Check if the address is already saved
      if (this.display) {
          Swal.fire({
              title: "The Address?",
              text: "Address is Already Saved ",
          });
      } else {
          // Confirm with the user if they want to save the address
          Swal.fire({
              title: "Do you want to save the Address",
              showDenyButton: true,
              showCancelButton: true,
              confirmButtonText: "Save",
              denyButtonText: `Don't save`
          }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                  // Call the API to save the address
                  console.log(addressDetails);
                  this.apiService.postApiWithToken(this.cons.api.saveAddress, addressDetails).subscribe(
                      (response: any) => {
                        if(response['status']==200){
                          Swal.fire("Address Saved!", "", "success");
                          this.display = true;
                        }
                      },
                      (error) => {
                          console.error('Save Address failed:', error);
                          Swal.fire("Error", "Failed to save address", "error");
                      }
                  );
              } else if (result.isDenied) {
                  Swal.fire("Changes are not saved", "", "info");
              }
          });
      }
  }



    changeInputType(target: EventTarget | null) {
      if (target instanceof HTMLInputElement) {
        const inputField = target as HTMLInputElement;
        inputField.setAttribute('type', 'date');
        // Remove the focus event listener to prevent subsequent changes
        inputField.removeEventListener('focus', () => this.changeInputType(target));
      }
    }


    getAddress(): void {
      this.apiService.getApiWithToken(this.cons.api.getUserAddress+"/"+this.sharedService.userId).subscribe(
        (response: any) => {
          console.log("this is the get all address in this .....")
          console.log(response);
          if (response.status === 200 && response.message === "success") {
            this.savedAddresses = response.response; // Assuming addresses are directly under response
          } else {
            console.error('Failed to fetch addresses:', response.message);
          }
        },
        (error) => {
          console.error('Failed to fetch addresses:', error);
        }
      );
    }

    toggleAdditionalFields() {
      this.showAdditionalFields = !this.showAdditionalFields;
    }

    toggleSelectSlot(address: any) {
      debugger;
      // Check if an address is selected
      if (address) {
        this.showSelectSlot = true;
        console.log("this is my selection ................"+this.showSelectSlot);
      } else {
        this.showSelectSlot = false;
        console.log("this is my selection ................"+this.showSelectSlot);

      }
    }



    }














