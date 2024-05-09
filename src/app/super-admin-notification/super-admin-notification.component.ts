import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallingServiceService } from '../services/api-calling/api-calling-service.service';
import { ConstantsService } from '../services/constants/constants.service';
import { SharedService } from '../services/shared/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-super-admin-notification',
  templateUrl: './super-admin-notification.component.html',
  styleUrl: './super-admin-notification.component.scss'
})
export class SuperAdminNotificationComponent implements OnInit {

  message:any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private apiService: ApiCallingServiceService,
    private cons: ConstantsService,
    private sharedService:SharedService,
  ) {}


ngOnInit(): void {

}

  







sendNotification() {
  debugger;
  const jsonData = {
    message:this.message,
    
 };
  this.apiService.postApiWithToken(this.cons.api.pushNotification, jsonData).subscribe({
    next: (v: object) => {
      let result: { [key: string]: any } = v;
      if (result['message'] == 'success') {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Message Send successfully!',
        });
       
      } 
    },
    error: (e) => {
      console.error(e);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Message Not Send ,  Something Went Wrong',
      });
    },
    complete: () => console.log(),
  });


}
}
