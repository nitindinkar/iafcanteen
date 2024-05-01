import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallingServiceService } from '../services/api-calling/api-calling-service.service';
import { ConstantsService } from '../services/constants/constants.service';

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

constructor(
  private router: Router,
  private http: HttpClient,
  private apiService: ApiCallingServiceService,
  private cons: ConstantsService,
) {}
 
  
  ngOnInit(): void {
  }
  addStore() {    
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
          alert("Product added Successfully");
          this.name = '';
          this.id= '';
          this.contact = ''; 
          this.address='';
          this.admin = ''; 
                           
        } 
      },
      error: (e) => {
  
        console.error(e);
      },
      complete: () => console.log(),
    });
  }


}
