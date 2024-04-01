import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ApiCallingServiceService} from "../services/api-calling/api-calling-service.service";
import {ConstantsService} from "../services/constants/constants.service";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent implements OnInit {
  @ViewChild('invoiceFileInput') invoiceFileInput: any;

  name: any;
  desc: any;
  aPrice: any;
  dPrice: any;
  categories: any;
  category:any;
  uploadId:any;
  types=[{
    id:'L',
    name:this.cons.constants.liquorCard
  },{
    id:'G',
    name:this.cons.constants.groceryCard
  }];
  catType: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private apiService: ApiCallingServiceService,
    private cons: ConstantsService,
  ) {}
  ngOnInit(): void {
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
        if(result["status"]==200){
          alert("Image Uploaded Successfully")
        }else{
          alert("Please Upload of same size image");
        }
      },
      error: (e) => {
        console.error(e);
      },
      complete: () => console.log(),
    });
  }

  addCategory() {
    //const file: File = this.invoiceFileInput.nativeElement;
    // console.log(file);
    const formData = new FormData();
    //formData.append('imageFiles', file);
    const jsonData = {
      name: this.name,
      description: this.desc,
      type: this.catType ,
      uploadId:this.upload
    };

    this.apiService.postApiWithToken(this.cons.api.addCategory, jsonData).subscribe({
      next: (v: object) => {
        let result: { [key: string]: any } = v;
        if (result['message'] == 'success') {
          alert("Category added Successfully");
          this.name = '';
          this.desc = '';
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

