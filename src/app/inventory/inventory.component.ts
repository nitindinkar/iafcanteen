import { CommonService } from './../services/common/common.service';

import { Component, OnInit } from '@angular/core';


import { ConstantsService } from '../services/constants/constants.service';
import { ApiCallingServiceService } from '../services/api-calling/api-calling-service.service';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared/shared.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { AddStockDialogComponent } from '../add-stock-dialog/add-stock-dialog.component';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent  implements OnInit{
  groccery: boolean =true;
  private cardType: string='';
  products: any;
  categories: any;
  categoriesSorted:any[]=[];
  filteredProducts: any;
  allProducts: any;
  editingMode: boolean = false;
  selectedProducts: any[] = [];

  productCount: any;

  selectedCategory: string = 'Filter By Category'; // Initialize selected category
  selectedStockStatus: string = 'Filter By Stock Status'; // Initialize selected stock status
  private data: any;
  currentIndex: number=0;


  constructor(public cons:ConstantsService,
    private apiService: ApiCallingServiceService,
    private router: Router,
    private sharedService: SharedService,
    private CommonService:CommonService,
    public dialog: MatDialog) { }




  ngOnInit(): void {
    this.getAllProduct();
    this.getcategories();

  }

  // public getAllProduct() {
  //   if(localStorage.getItem('card')==this.cons.constants.liquorCard){
  //     this.groccery=false;
  //     this.cardType='L';
  //     }
  //   else{
  //     this.groccery=true;
  //     this.cardType='G'
  //   }
  //   this.apiService.getApiWithToken(this.cons.api.getAllProductAdmin).subscribe(
  //     (response: object) => {
  //       let result: { [key: string]: any } = response;
  //       this.products=result['response'];
  //       const availableStock = result[0]['availableStock'];
  //       console.log(this.products);

  //     },
  //     (error) => {
  //       console.error('Add Product failed:', error);
  //     }
  //   );
  // }

  getcategories(){

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

  // filterProductsByCategory() {
  //   debugger;
  //   if (this.selectedCategory !== 'Filter By Category') {
  //     // Filter products only if a valid category is selected
  //     this.filteredProducts = this.products.filter((product: { categoryName: string; }) => product.categoryName === this.selectedCategory);
  //   } else {
  //     // If 'Filter By Category' is selected, display all products
  //     this.filteredProducts = this.products;
  //   }
  // }
  currentStock=0;
  newStockValue=0;

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
setFilteredProduct(data:any){
  this.filteredProducts=data;
}
public filterProductsByCategory() {
  debugger;
    if (this.selectedCategory === 'Filter By Category') {
        this.filteredProducts = this.allProducts; // Reset filter if "Filter By Category" is selected
    } else {
        // Filter products by selected category
        this.filteredProducts = this.allProducts.filter((product: { category: { name: string; }; }) => product.category.name === this.selectedCategory);
    }
}

public filterProductsByStockStatus() {
  debugger;
    if (this.selectedStockStatus === 'Filter By Stock Status') {
        this.filteredProducts = this.allProducts; // Reset filter if "Filter By Stock Status" is selected
    } else {
        // Filter products by selected stock status
        if (this.selectedStockStatus === 'In Stock') {
            this.filteredProducts = this.allProducts.filter((product: { availableStock: number; }) => product.availableStock > 0);
        } else if (this.selectedStockStatus === 'Out of Stock') {
            this.filteredProducts = this.allProducts.filter((product: { availableStock: number; }) => product.availableStock === 0 || product.availableStock===null);
        }
    }
}

public applyFilters() {
  this.filterProductsByCategory();
  this.filterProductsByStockStatus();
}

toggleSelectProduct(event: any, product: any) {
  const checkbox = event.target as HTMLInputElement;
  if (checkbox.checked) {
    // If checkbox is checked, add the product to the selected products array
    this.selectedProducts.push(product);
  } else {
    // If checkbox is unchecked, remove the product from the selected products array
    const index = this.selectedProducts.indexOf(product);
    if (index !== -1) {
      this.selectedProducts.splice(index, 1);
    }
  }
}


handleEditAction() {
  if (this.selectedProducts.length > 0) {
    this.editingMode = true;
  }
}

handleApply(): void {
  // Apply changes to the selected products (e.g., update total stock)
  // Clear selection and exit editing mode
  for (const product of this.selectedProducts) {
    this.updateStock(product.productId, product.availableStock);
  }
  // Clear the selection and exit editing mode
  this.selectedProducts = [];
  this.editingMode = false;
}


toggleSelectAll(event: any) {
  const checkbox = event.target as HTMLInputElement;
  if (checkbox.checked) {
    // If checkbox is checked, select all filtered products
    this.selectedProducts = [...this.filteredProducts];
  } else {
    // If checkbox is unchecked, clear the selection
    this.selectedProducts = [];
  }
}

isSelected(product: any): boolean {
  // Check if the product is in the selected products array
  return this.selectedProducts.includes(product);
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
        this.getAllProduct();

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


openAddStockDialog(product: any): void {
  debugger;
  const dialogRef = this.dialog.open(AddStockDialogComponent, {
    width: '300px',
    data: { product: product }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result !== undefined) {
      // Perform the stock update operation here using the result
      this.updateStock(product.productId, product.availableStock + result);
    }
  });


}

  // Function to confirm adding stock
  confirmAddStock(): void {
    debugger;
    console.log(this.data);
    // Call the updateStock function with the new stock value
    this.updateStock(this.data.product.productId, this.newStockValue);
  }

  setCurrent(product: any,i:number) {
    this.currentStock=product.availableStock;
    this.currentIndex=i;
  }
}


