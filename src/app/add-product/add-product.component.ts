import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallingServiceService } from '../services/api-calling/api-calling-service.service';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from '../services/constants/constants.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {

  @ViewChild('invoiceFileInput') invoiceFileInput: any;

  name: any;
  desc: any;
  aPrice: any;
  dPrice: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private apiService: ApiCallingServiceService,
    private cons: ConstantsService,
  ) {}


  upload() {
    debugger;
      const file: File = this.invoiceFileInput.nativeElement.files[0];
      const formData = new FormData();
      formData.append('file', file);
      this.apiService.postApiWithToken(this.cons.api.upload, formData).subscribe({
        next: (v: object) => {

          let result: { [key: string]: any } = v;


            this.upload=result['response'].uploadDocId;


        },
        error: (e) => {
          console.error(e);
        },
        complete: () => console.log(),
    });
}

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
  debugger;

  this.apiService.postApiWithToken(this.cons.api.addProduct, formData).subscribe({
    next: (v: object) => {
      let result: { [key: string]: any } = v;
      if (result['message'] == 'success') {

      } else {

      }
    },
    error: (e) => {

      console.error(e);
    },
    complete: () => console.log(),
  });
}

}
