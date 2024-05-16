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
 
  filteredAdmin: any;
  selectedStatus:String ='Filter By Admin Status';
  slideToggleValue: any;
  initialAdminActiveState: any;

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
      this.getAllAdminsDetails();
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

//   toggleAdminStatus(admin: any): void {
//     // Toggle the admin's status between 'Active' and 'Inactive'
//     admin.status = 'Active' === 'Active' ? 'Inactive' : 'Active';

//  }

toggleAdminStatus(admin: any): void {
  this.initialAdminActiveState = admin.active;
  admin.active = !admin.active; // Toggle the active state of the admin
  if (admin.active) {
    // Call method to activate admin
    this.activeAdmins(admin.id);
  } else {
    // Call method to deactivate admin
    this.deactiveAdmins(admin.id);
  }
}

cancelToggleAction(adminId: any): void {
  // Revert the toggle to its initial state
  const admin = this.allAdmins.find((admin: { id: any; }) => admin.id === adminId);
  if (admin) {
    // Revert the toggle to its initial state
    admin.active = this.initialAdminActiveState;
  }
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
          console.log("this is the total active admins");
          console.log((result['response'].length));
          console.log(result);
          this.getAllAdminsDetails();
          Swal.fire({
            icon: 'success',
            title: 'Admin Activated',
            text: 'Admin has been successfully activated!',
          });
          // You can add further handling here if needed
        },
        (error) => {
          console.error('Retrieve Active Admins failed:', error);
        }
      );
    }
    else{
      this.cancelToggleAction(adminId);
      this.getAllAdminsDetails();
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
          Swal.fire({
            icon: 'success',
            title: 'Admin Deactivated',
            text: 'Admin has been successfully Deactivated!',
          });
          
          // You can add further handling here if needed
        },
        (error) => {
          console.error('Deactivate Admins failed:', error);
        }
      );
    }
    else{
      this.cancelToggleAction(adminId);
      this.getAllAdminsDetails();
    }
  });
}

getAllAdminsDetails(){
  this.apiService.getApiWithToken(this.cons.api.getAllAdmins).subscribe(
    (response: object) => {
      let result: { [key: string]: any } = response;
      this.allAdmins=result['response'];  
      this.filteredAdmin=this.allAdmins;    
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

update(){
  debugger;
  const data={
    serviceNo:this.serviceNo,
    name:this.name,
    contact:this.contact,
    email:this.email,
      }

  this.apiService.postApiWithToken(this.cons.api.updateAdmin + '/' + this.id,data).subscribe(
    (response: any) => {
      if(response['message']==="success"){
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: ' Admin Updated successfully!',
      });
      
      this.serviceNo='';
      this.name='';
      this.contact='';
      this.email='';
      this.edit=false;
    }
    this.getAllAdminsDetails();
        
           
     },
    (error: any) => {
      console.error('Error fetching product details:', error);
    }
  );
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

filterByAdmin(): void {
  debugger;
  if (this.selectedStatus === 'Filter By Admin Status') {
    // If no status selected, show all stores
    this.filteredAdmin = this.allAdmins;
  } else {
    // Filter stores based on selected status
    this.filteredAdmin  = this.allAdmins.filter((admin: { active: boolean; }) => {
      // Check if the admin's active status matches the selected status
      return admin.active === (this.selectedStatus === 'Active');
    });
  }
}


}

