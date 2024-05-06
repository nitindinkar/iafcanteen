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
  allAdmins:any;
  name: any;
  id: any;
  edit: boolean=false;

constructor(
  private router: Router,
  private http: HttpClient,
  private apiService: ApiCallingServiceService,
  private cons: ConstantsService,
  private sharedService:SharedService,
) {}



 
  ngOnInit(): void {
   
    
    this.getAllActiveAdmins();
    this.getAllAdminsDetails();
    
  }

  addAdmins() {    
    const jsonData = {
      name:this.name,
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
        this.name='';
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
 activeAdmins(adminId:any) {
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
      this.apiService.getApiWithToken(this.cons.api.activateAdmin+"/"+adminId).subscribe(
        (response: object) => {
          let result: { [key: string]: any } = response;
          console.log(result);
          this.getAllAdminsDetails();
          // You can add further handling here if needed
        },
        (error) => {
          console.error('Retrieve Active Admins failed:', error);
        }
      );
    }
  });
}

 

 deactiveAdmins(adminId:any) {
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
      this.apiService.getApiWithToken(this.cons.api.deactivateAdmin+"/"+adminId).subscribe(
        (response: object) => {
          let result: { [key: string]: any } = response;
          this.allAdmins=result;
          this.getAllAdminsDetails();
          // You can add further handling here if needed
        },
        (error) => {
          console.error('Deactivate Admins failed:', error);
        }
      );
    }
  });
}

getAllAdminsDetails(){
  this.apiService.getApiWithToken(this.cons.api.getAllAdmins).subscribe(
    (response: object) => {
      let result: { [key: string]: any } = response;
      this.allAdmins=result['response'];      
    },
    (error) => {
      console.error('Add Product failed:', error);
    }
  );
}

editAdmin(admin:any,adminId:any){
  console.log(admin);
  console.log(adminId);
  debugger;
      this.id=adminId;
      this.name=admin.name;
      this.serviceNo=admin.serviceNo;
      this.email=admin.email;       
      this.contact=admin.contact;
     this.edit=true;
}

updatePdf(){

  

}



deleteAdmin(delAdminId:any) {
  debugger;
  Swal.fire({
    title: 'Delete Store',
    text: 'Are you sure you want to delete this store?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it'
  }).then((result) => {
    if (result.isConfirmed) {
      // User confirmed, make delete API call
      
      this.apiService.deleteApiWithToken(this.cons.api.deleteStore + '/' + delAdminId).subscribe({
        next: (response: any) => {
          console.log('Delete request successful:', response);
          // Handle success here if needed, such as displaying a success message to the user
          this.getAllAdminsDetails()
        },
        error: (error) => {
          console.error('Delete request failed:', error);
          // Handle error here if needed, such as displaying an error message to the user
        }
      });
    }
  });
}

}

