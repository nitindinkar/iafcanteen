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


constructor(
  private router: Router,
  private http: HttpClient,
  private apiService: ApiCallingServiceService,
  private cons: ConstantsService,
) {}
 
  
  ngOnInit(): void {
    this.getStore();
  }


  addStore() {    
    debugger;
    const jsonData = {
      name : this.name,
      id:this.id,
      contact :this.contact,
      address:this.address,
      admin:this.admin,
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
    this.apiService.getApiWithToken(this.cons.api.getAllActiveStores).subscribe(
      (response: object) => {
        let result: { [key: string]: any } = response;
        this.stores=result['response'];
        this.storeId = this.stores[0].id;
        console.log(this.storeId);
        
                
      },
      (error) => {
        console.error('Add Product failed:', error);
      }
    );
  }

  activateStore() {
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
        this.apiService.getApiWithToken(this.cons.api.activateStore + "/" + this.storeId).subscribe(
          (response: object) => {
            let result: { [key: string]: any } = response;
            this.stores = result['response'];
            console.log(this.stores);
            // You can add further handling here if needed
          },
          (error) => {
            console.error('Activate Store failed:', error);
          }
        );
      }
    });
  }

  
  deactivateStore() {
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
        this.apiService.getApiWithToken(this.cons.api.deactivateStore + "/" + this.storeId).subscribe(
          (response: object) => {
            let result: { [key: string]: any } = response;
            this.stores = result['response'];
            console.log(this.stores);
            // You can add further handling here if needed
          },
          (error) => {
            console.error('Deactivate Store failed:', error);
          }
        );
      }
    });
  }

  deleteStore(storeId:any) {
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
        this.apiService.deleteApiWithToken(this.cons.api.deleteStore + '/' + this.storeId).subscribe({
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

  editStore(stores:any,storeId:any){


  //   this.apiService.updateApiWithToken(this.cons.api.updateSuperAdminStore + '/' + this.storeId).subscribe(
  //     (response: any) => {
  //       let productDetails: any = response;
    
         
  //      },
  //     (error: any) => {
  //       console.error('Error fetching product details:', error);
  //     }
  //   );
  // }
  


}
}
