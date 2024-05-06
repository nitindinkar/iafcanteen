import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallingServiceService } from '../services/api-calling/api-calling-service.service';
import { ConstantsService } from '../services/constants/constants.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-store',
  templateUrl: './manage-store.component.html',
  styleUrl: './manage-store.component.scss'
})
export class ManageStoreComponent implements OnInit {
id: any;
contact: any;
address: any;
admin: any;
name: any;
stores: any[] = [];
storeId: any;
activeAdmins: string[] = []; 
deactiveAdmins: any;
selectedAdminId: any;
edit: boolean=false;
allAdmins: any;



constructor(
  private router: Router,
  private http: HttpClient,
  private apiService: ApiCallingServiceService,
  private cons: ConstantsService,
) {}
 
  
  ngOnInit(): void {
   
    this.getDeactiveAdmins();
    this.getStore();
    this.getActiveAdmins();
    this.getAllAdminsDetails();
  }


  addStore() {    
    debugger;
    
    const jsonData = {
      name : this.name,
      id:this.id,
      contact :this.contact,
      address:this.address,
      //admin:this.admin,
       admin:this.selectedAdminId,
   };
     
   this.apiService.postApiWithToken(this.cons.api.addStore, jsonData).subscribe({
    next: (v: object) => {
      let result: { [key: string]: any } = v;
      if (result['message'] == 'success') {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Store added successfully!',
        });
        this.name = '';
        this.id = '';
        this.contact = ''; 
        this.address = '';
        this.admin = ''; 
      } 
    },
    error: (e) => {
      console.error(e);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to add store. Please try again later.',
      });
    },
    complete: () => console.log(),
  });
  
  }

  getStore(){
    this.apiService.getApiWithToken(this.cons.api.getAllStore).subscribe(
      (response: object) => {
        let result: { [key: string]: any } = response;
        this.stores=result['response'];
        
        console.log(this.storeId);
        
                
      },
      (error) => {
        console.error('Add Product failed:', error);
      }
    );
  }

  activateStore(activeId:any) {
    Swal.fire({
      title: 'Activate Store',
      text: 'Are you sure you want to activate this store?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, activate it'
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed, make API call
        this.apiService.getApiWithToken(this.cons.api.activateStore + "/" +activeId).subscribe(
          (response: object) => {
            let result: { [key: string]: any } = response;
            this.stores = result['response'];
            console.log(this.stores);
            this.getStore();
            // You can add further handling here if needed
          },
          (error) => {
            console.error('Activate Store failed:', error);
          }
        );
      }
    });
  }

  
  deactivateStore(deactiveId:any) {
    Swal.fire({
      title: 'Deactivate Store',
      text: 'Are you sure you want to deactivate this store?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, deactivate it'
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed, make API call
        this.apiService.getApiWithToken(this.cons.api.deactivateStore + "/" + deactiveId).subscribe(
          (response: object) => {
            let result: { [key: string]: any } = response;
            this.stores = result['response'];
            console.log(this.stores);
            this.getStore();
            // You can add further handling here if needed
          },
          (error) => {
            console.error('Deactivate Store failed:', error);
          }
        );
      }
    });
  }

  deleteStore(delId:any) {
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
        console.log(this.storeId);
        // Make API call to delete the store
        this.apiService.deleteApiWithToken(this.cons.api.deleteStore + '/' + delId).subscribe({
          next: (response: any) => {
            console.log('Delete request successful:', response);
            // Handle success here if needed, such as displaying a success message to the user
          },
          error: (error) => {
            console.error('Delete request failed:', error);
            // Handle error here if needed, such as displaying an error message to the user
          }
        });
      }
    });
  }

  editStore(stores:any,storeIdEdit:any){
debugger;
  console.log('Stores:', stores);
  

  // Ensure that the correct property names are used to assign values
  this.name = stores.name;
  this.id = storeIdEdit;
  this.contact = stores.contact;
  this.address = stores.address;
  this.admin = stores.admin; // Assuming adminId is the correct property name
  this.edit = true;
  }

  updateStore(){   
    debugger; 
    const data = {
      id: this.id,
      name: this.name,
      contact: this.contact,
      address: this.address,
      adminId: this.selectedAdminId // Assuming adminId is the correct property name
    };
    console.log(data);
     this.apiService.updateApiWithToken(this.cons.api.updateSuperAdminStore + '/' + this.id,data).subscribe(
      (response: any) => {
        let productDetails: any = response;
        this.edit=false;
             
       },
      (error: any) => {
        console.error('Error fetching product details:', error);
      }
    );
  }
  
 


  // This will hold the list of active admins
  
getActiveAdmins() {

  this.apiService.getApiWithToken(this.cons.api.activeAdmins).subscribe(
    (response: object) => {
      let result: { [key: string]: any } = response;
      this.activeAdmins = result['response'];
      console.log(this.activeAdmins);
      // You can add further handling here if needed
    },
    (error) => {
      console.error('Activate Store failed:', error);
    }
  );
}

getDeactiveAdmins() {

  this.apiService.getApiWithToken(this.cons.api.deactivedAdmins).subscribe(
    (response: object) => {
      let result: { [key: string]: any } = response;
      this.deactiveAdmins = result['response'];
      console.log(this.deactiveAdmins);
      // You can add further handling here if needed
    },
    (error) => {
      console.error('Activate Store failed:', error);
    }
  );
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
  

}
