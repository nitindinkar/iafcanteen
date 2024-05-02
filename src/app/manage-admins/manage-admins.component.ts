import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallingServiceService } from '../services/api-calling/api-calling-service.service';
import { ConstantsService } from '../services/constants/constants.service';
import { SharedService } from '../services/shared/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-admins',
  templateUrl: './manage-admins.component.html',
  styleUrl: './manage-admins.component.scss'
})
export class ManageAdminsComponent  implements OnInit {
serviceNo: any;
password: any;
email: any;
contact: any;

constructor(
  private router: Router,
  private http: HttpClient,
  private apiService: ApiCallingServiceService,
  private cons: ConstantsService,
  private sharedService:SharedService,
) {}


admins: { name: string, status: string }[] = [
  { name: 'Admin 1', status: 'Active' },
  { name: 'Admin 2', status: 'Inactive' },
  { name: 'Admin 3', status: 'Active' },
  // Add more admins as needed
];
 
 
  ngOnInit(): void {
   
    
    this.getAllActiveAdmins();
    
  }

  addAdmins() {    
    const jsonData = {
      serviceNo: this.serviceNo,
      email:this.email,
      password:this.password,
      contact:this.contact,
   };
     
   this.apiService.postApiWithToken(this.cons.api.addAdminDetails, jsonData).subscribe({
    next: (v: object) => {
      let result: { [key: string]: any } = v;
      if (result['message'] == 'success') {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Admin added successfully!',
        });
        
        this.serviceNo = '';
        this.email= '';
        this.password = ''; 
        this.contact = ''; 
      } 
    },
    error: (e) => {
      console.error(e);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to add admin. Please try again later.',
      });
    },
    complete: () => console.log(),
  });
  }  

   getAllActiveAdmins() {
    this.apiService.getApiWithToken(this.cons.api.getActiveAdmins).subscribe(
      (response: object) => {
        let result: { [key: string]: any } = response;
        console.log(result);        
      },
      (error) => {
        console.error('Add Product failed:', error);
      }
    );
  }

  toggleAdminStatus(admin: any): void {
    // Toggle the admin's status between 'Active' and 'Inactive'
    admin.status = 'Active' === 'Active' ? 'Inactive' : 'Active';

 }
 activeAdmins() {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You are about to retrieve active admins. Do you want to continue?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, active admins'
  }).then((result) => {
    if (result.isConfirmed) {
      // User clicked confirm button, make API call
      this.apiService.getApiWithToken(this.cons.api.activeAdmins).subscribe(
        (response: object) => {
          let result: { [key: string]: any } = response;
          console.log(result);
          // You can add further handling here if needed
        },
        (error) => {
          console.error('Retrieve Active Admins failed:', error);
        }
      );
    }
  });
}

 

 deactiveAdmins() {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You are about to deactivate admins. Do you want to continue?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, deactivate admins'
  }).then((result) => {
    if (result.isConfirmed) {
      // User clicked confirm button, make API call
      this.apiService.getApiWithToken(this.cons.api.deactiveAdmins).subscribe(
        (response: object) => {
          let result: { [key: string]: any } = response;
          console.log(result);
          // You can add further handling here if needed
        },
        (error) => {
          console.error('Deactivate Admins failed:', error);
        }
      );
    }
  });
}
}
