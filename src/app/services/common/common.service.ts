import { Injectable } from '@angular/core';
import {ConstantsService} from "../constants/constants.service";
import {ApiCallingServiceService} from "../api-calling/api-calling-service.service";
// import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private cons:ConstantsService,
              private apiService: ApiCallingServiceService,) {
  }

  addToCart(productId:string){
    this.apiService.getApiWithToken(this.cons.api.addToCart+'/'+productId).subscribe(
      (response: object) => {
        let result: { [key: string]: any } = response;
        return(result);
      },
      (error) => {
        console.error('Add Product failed:', error);
      }
    );
  }
  public getAllCategories() {
    this.apiService.getApiWithToken(this.cons.api.getAllCategories).subscribe(
      (response: object) => {
        let result: { [key: string]: any } = response;
        debugger;
        return(result['response']);

      },
      (error) => {
        console.error('category not fetch:', error);
      }
    );
  }




}
