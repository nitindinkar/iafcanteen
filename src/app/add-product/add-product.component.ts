import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiCallingServiceService} from "../services/api-calling/api-calling-service.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {ConstantsService} from "../services/constants/constants.service";
import {CommonService} from "../services/common/common.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit {
  @ViewChild('invoiceFileInput') invoiceFileInput: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private apiService: ApiCallingServiceService,
    private cons: ConstantsService,
    private common: CommonService,
    ) {}

  name: any;
  desc: any;
  aPrice: any;
  dPrice: any;
  catagoryId: any;
  
  ngOnInit(): void {}



  addProduct() {
   
          const file: File = this.invoiceFileInput.nativeElement;
      // console.log(file);
      const formData = new FormData();
      formData.append('imageFiles', file);
    const jsonData = {
      productName: this.name,
      productDescription: this.desc,
      productActualPrice: this.aPrice,
      productDiscountedPrice: this.dPrice
      

    };
    formData.append('json_data', JSON.stringify(jsonData));
    
    
    let token = localStorage.getItem("token");
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    debugger;
     console.log(headers);
    
    this.apiService.postApi(this.cons.api.addProduct, formData).subscribe({
        next: (v: object) => {
          let result: { [key: string]: any } = v;
          if (result['message'] == 'success') {
            this.common.successAlert(
              'Success',
              result['response']['msg'],
              'success'
            );
          } else {
            this.common.faliureAlert('Please try later', result['message'], '');
          }
        },
        error: (e) => {

          console.error(e);
          this.common.faliureAlert('Error', e['error']['message'], 'error');
        },
        complete: () => console.log(),
      });
    }

    addProductDetails() {
      debugger;
      const file: File = this.invoiceFileInput.nativeElement;
      const formData = new FormData();
      formData.append('imageFiles', file);
    
      const jsonData = {
        productName: this.name,
        productDescription: this.desc,
        productActualPrice: this.aPrice,
        productDiscountedPrice: this.dPrice,
        productCatagory:this.catagoryId
      };
      formData.append('json_data', JSON.stringify(jsonData));
    
      // Get the token from wherever it's stored (e.g., localStorage)
      const token = localStorage.getItem("token");
    
      // Create HttpHeaders with the token
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token
      });
      const options = { headers: headers };
    
      // Pass the headers in the request
      this.apiService.postApiWithToken(this.cons.api.addProduct, formData ).subscribe({
        next: (v: object) => {
          let result: { [key: string]: any } = v;
          if (result['message'] == 'success') {
            this.common.successAlert('Success', result['response']['msg'], 'success');
          } else {
            this.common.faliureAlert('Please try later', result['message'], '');
          }
        },
        error: (e) => {
          console.error(e);
          this.common.faliureAlert('Error', e['error']['message'], 'error');
        },
        complete: () => console.log(),
      });
    }

}
