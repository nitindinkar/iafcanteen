
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConstantsService } from '../services/constants/constants.service';
import { ApiCallingServiceService } from '../services/api-calling/api-calling-service.service';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared/shared.service';
import Swal from 'sweetalert2';
import { InventoryComponent } from '../inventory/inventory.component';



@Component({
  selector: 'app-add-stock-dialog',
  templateUrl: './add-stock-dialog.component.html',
  styleUrls: ['./add-stock-dialog.component.scss']
})
export class AddStockDialogComponent {
  currentStock: number;
  newStockValue: number;
  allProducts: any;
  productCount: any;
  filteredProducts: any;

  constructor(
    public dialogRef: MatDialogRef<AddStockDialogComponent>,
    public cons:ConstantsService,
    private inv:InventoryComponent,
    private apiService: ApiCallingServiceService,
    
     @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Initialize currentStock with the existing stock value
    this.currentStock = data.product.availableStock || 0;
    // Initialize newStockValue with 0
    this.newStockValue = 0;
  }

 

  closeDialog(): void {
    // Close the dialog without passing any data
    this.getAllProduct();
    this.dialogRef.close();
  }

  // Function to confirm adding stock
  confirmAddStock(): void {
    debugger;
    console.log(this.data);
    // Call the updateStock function with the new stock value
    this.updateStock(this.data.product.productId, this.newStockValue);
  }

  updateStock(productIdUpdate:number, newStockValue: number) {
    debugger;
  
  //  const url=this.cons.api.updateStockOnly+"/"+product+"/"+stock?stock=newStockValue
   const url = `${this.cons.api.updateStockOnly}/${productIdUpdate}/stock?stock=${newStockValue}`;
   console.log(url);
  
    this.apiService.postApiWithToken(url,{}).subscribe({
      next: (v: object) => {
        let result: { [key: string]: any } = v;
        if (result['message'] == 'success') {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Stock Updated Successfully'
          });

          

          this.apiService.getApiWithToken(this.cons.api.getAllProductAdmin).subscribe(
            (response: object) => {
                let result: { [key: string]: any } = response;
                if(result['response'].message=='Success')
                  this.inv.setFilteredProduct(result['response']);
            },
            (error) => {
                console.error('Failed to fetch products:', error);
            }
        );

          
          
          
        }
      },
      error: (e) => {
  
        console.error(e);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to Update Stock. Please try again later.'
        });
      },
      complete: () => console.log(),
    });
  
    
  }


  public getAllProduct() {
    // Fetch all products
    this.apiService.getApiWithToken(this.cons.api.getAllProductAdmin).subscribe(
        (response: object) => {
            let result: { [key: string]: any } = response;
            this.allProducts = result['response'];
            this.productCount=this.allProducts.length;
            this.filteredProducts = this.allProducts; // Initialize filtered products with all products
            console.log(this.allProducts);
        },
        (error) => {
            console.error('Failed to fetch products:', error);
        }
    );
}
}
