import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ApiCallingServiceService} from "../services/api-calling/api-calling-service.service";
import {ConstantsService} from "../services/constants/constants.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent implements OnInit {
searchQuery: any;

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
  filteredProducts: any;
edited: any;
  type: any;
  id: any;
  isEdit: boolean=false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private apiService: ApiCallingServiceService,
    private cons: ConstantsService,
  ) {}
  ngOnInit(): void {
    this.getcategories();
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

  getcategories(){
    

    this.apiService.getApiWithToken(this.cons.api.getAllCategories).subscribe(
      (response: object) => {
        let result: { [key: string]: any } = response;
        this.categories=result['response'];   
        this.filteredProducts = this.categories;      
        console.log(this.filteredProducts);
        
      },
      (error) => {
        console.error('Add Product failed:', error);
      }
    );
  }
  // searchProducts() {
  //   debugger;
  //   if (!this.searchQuery) {
  //     // If search query is empty, reset filteredProducts to all products
  //     this.filteredProducts = this.categories;
  //   } else {
  //     // Filter products based on search query
  //     this.filteredProducts = this.categories.filter((categories: { name: string; category: { name: string; }; }) =>
  //       product.productName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
  //       product.category.name.toLowerCase().includes(this.searchQuery.toLowerCase())
  //     );
  //   }
  // }

  editCategory(category: any,categoryId:any) {
    this.id=categoryId;
    this.name=category.name;
    this.desc =category.description;
    this.uploadId=category.uploadId;
    this.type=category.type;
    this.isEdit = true;
        
  }

  updateCategory(){
debugger;
    const data = {
      id:this.id,
      name: this.name,
      description: this.desc,
      type: this.catType ,
      uploadId:this.upload
      
    };
    console.log(data);  
  ///Fetch product details by productId
  this.apiService.updateApiWithTokenPatch(this.cons.api.updateCategory ,data).subscribe(
    (response: any) => {
      let productDetails: any = response;
      this.isEdit = false;

      this.id='',
      this.name='',
      this.desc='',
      this.catType='' ,
      
      this.getcategories();

       
     },
    (error: any) => {
      console.error('Error fetching product details:', error);
    }
  );
}

// deleteCategory(i: number, productId: any) {
//   debugger;
//   // Show a confirmation dialog using SweetAlert
//   Swal.fire({
//     title: 'Are you sure?',
//     text: 'You are about to delete this order. This action cannot be undone.',
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#3085d6',
//     cancelButtonColor: '#d33',
//     confirmButtonText: 'Yes, delete it!'
//   }).then((result) => {
//     if (result.isConfirmed) {
//       // User confirmed, proceed with order deletion
//       this.apiService.deleteApiWithToken(this.cons.api.deleteProduct + '/' + productId).subscribe(
//         (response: object) => {
//           // Order deleted successfully, remove it from the orderDetails list
//           this.categories.splice(i, 1);
//           // Show success message
//           Swal.fire(
//             'Deleted!',
//             'The order has been deleted.',
//             'success'
//           );
//         },
//         (error: any) => {
//           // Error handling if deletion fails
//           console.error('Delete order failed:', error);
//           // Show error message
//           Swal.fire(
//             'Error!',
//             'Failed to delete the order.',
//             'error'
//           );
//         }
//       );
//     }
//   });
// }



}

