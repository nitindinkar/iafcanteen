import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallingServiceService } from '../services/api-calling/api-calling-service.service';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from '../services/constants/constants.service';
import Swal from 'sweetalert2';

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
  groccery: boolean =true;
  private cardType: string='';
  products: any;
  filteredProducts: any;
searchQuery: any;
  edited: boolean=false;
  stock: any;
  image: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private apiService: ApiCallingServiceService,
    private cons: ConstantsService,
  ) {}
    ngOnInit(): void {
        this.getAllCategories();
        this.getAllProduct();
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
            if(result["status"]==200){
              Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Image Uploaded Successfully'
              });
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to Upload Image. Please try again later.'
              });
            }


        },
        error: (e) => {
          console.error(e);
        },
        complete: () => console.log(),
      });
  }

addProduct() {
  this.edited=false;
  //const file: File = this.invoiceFileInput.nativeElement;
  // console.log(file);
  const formData = new FormData();
  debugger;
  //formData.append('imageFiles', file);
  const jsonData = {
    productName: this.name,
    productDescription: this.desc,
    productDiscountedPrice: this.dPrice,
    productActualPrice: this.aPrice,
    categoryId:this.category,
    uploadId:this.upload,
    availableStock:Number(this.stock),
    
  };
  // formData.append('json_data', JSON.stringify(jsonData));
  // debugger;

  this.apiService.postApiWithToken(this.cons.api.addProduct, jsonData).subscribe({
    next: (v: object) => {
      let result: { [key: string]: any } = v;
      if (result['message'] == 'success') {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Product added Successfully'
        });

        this.getAllProduct();
        

        this.name = '';
        this.desc = '';
        this.aPrice = null;
        this.dPrice = null;
        this.category = null;
        this.stock='';

      }
    },
    error: (e) => {

      console.error(e);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to add product. Please try again later.'
      });
    },
    complete: () => console.log(),
  });
}


public getAllProduct() {
  debugger;
  if(localStorage.getItem('card')==this.cons.constants.liquorCard){
    this.groccery=false;
    this.cardType='L';
    }
  else{
    this.groccery=true;
    this.cardType='G'
  }
  this.apiService.getApiWithToken(this.cons.api.getAllProductAdmin).subscribe(
    (response: object) => {
      let result: { [key: string]: any } = response;
      this.products=result['response'];
      this.filteredProducts = this.products;
      console.log(this.products);

    },
    (error) => {
      console.error('Add Product failed:', error);
    }
  );
}

// Inside your component class
deleteProduct(i: number, productId: any) {
  debugger;
  // Show a confirmation dialog using SweetAlert
  Swal.fire({
    title: 'Are you sure?',
    text: 'You are about to delete this Product. This action cannot be undone.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      // User confirmed, proceed with order deletion
      this.apiService.deleteApiWithToken(this.cons.api.deleteProduct + '/' + productId).subscribe(
        (response: object) => {
          // Order deleted successfully, remove it from the orderDetails list
          this.products.splice(i, 1);
          // Show success message
          Swal.fire(
            'Deleted!',
            'The Product has been deleted.',
            'success'
          );
        },
        (error: any) => {
          // Error handling if deletion fails
          console.error('Delete Product failed:', error);
          // Show error message
          Swal.fire(
            'Error!',
            'Failed to delete the Product.',
            'error'
          );
        }
      );
    }
  });
}

// Inside your component class
searchProducts() {
  debugger;
  if (!this.searchQuery) {
    // If search query is empty, reset filteredProducts to all products
    this.filteredProducts = this.products;
  } else {
    // Filter products based on search query
    this.filteredProducts = this.products.filter((product: { productName: string; category: { name: string; }; }) =>
      product.productName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      product.category.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
id:any;
editProduct(product: any,productId:any) {
    debugger;
    console.log(productId);

    this.edited=true;   

    this.name=product.productName;
    this.desc=product.productDescription;
    this.aPrice=product.productActualPrice;
    this.dPrice=product.productDiscountedPrice;
    this.category=product.categoryId;
    this.id=productId;
    this.image=product.imageUrl;
     
  }
  
  updateProd(){
    
    const data = {
      productId: this.id,
      productName: this.name,
      productDescription: this.desc,
      productDiscountedPrice: this.dPrice,
      productActualPrice: this.aPrice,
      imageUrl:this.image,
      uploadId:this.upload,
      categoryId:this.category,
      availableStock:this.stock
      
    };
    console.log(data);  
  ///Fetch product details by productId
  this.apiService.postApiWithToken(this.cons.api.updateProduct,data).subscribe(
    (response: any) => {
      let productDetails: any = response;
      this.edited=false;
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: ' Product Updated Successfully'
      });

       
     },
    (error: any) => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to Update product. Something Went Wrong.'
      });
      console.error('Error fetching product details:', error);
    }
  );
}







}

  

