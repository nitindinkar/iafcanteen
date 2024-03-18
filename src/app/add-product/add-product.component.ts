import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallingServiceService } from '../services/api-calling/api-calling-service.service';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from '../services/constants/constants.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit {
  @ViewChild('invoiceFileInput') invoiceFileInput: any;

  name: any;
  desc: any;
  aPrice: any;
  dPrice: any;
  categories: any;
  category:any;
  uploadId:any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private apiService: ApiCallingServiceService,
    private cons: ConstantsService,
  ) {}
    ngOnInit(): void {
        this.getAllCategories();
  }


 

    getAllCategories() {
      this.apiService.getApiWithToken(this.cons.api.getAllCategories).subscribe(
        (response: object) => {
          let result: { [key: string]: any } = response;
           this.categories=result['response'];
          
          
        },
        (error) => {
          console.error('Add Product failed:', error);
        }
      );
    }



  


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
  //const file: File = this.invoiceFileInput.nativeElement;
  // console.log(file);
  const formData = new FormData();
  //formData.append('imageFiles', file);
  const jsonData = {
    productName: this.name,
    productDescription: this.desc,
    productActualPrice: this.aPrice,
    productDiscountedPrice: this.dPrice,
    categoryId:this.category,
    uploadId:this.upload
    

  };
  // formData.append('json_data', JSON.stringify(jsonData));
  // debugger;

  this.apiService.postApiWithToken(this.cons.api.addProduct, jsonData).subscribe({
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
