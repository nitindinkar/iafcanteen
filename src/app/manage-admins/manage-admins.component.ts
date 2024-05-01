import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallingServiceService } from '../services/api-calling/api-calling-service.service';
import { ConstantsService } from '../services/constants/constants.service';

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
) {}
 
 
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
          alert("Product added Successfully");
          this.serviceNo = '';
          this.email= '';
          this.password = ''; 
          this.contact = ''; 
                           
        } 
      },
      error: (e) => {
  
        console.error(e);
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

}
