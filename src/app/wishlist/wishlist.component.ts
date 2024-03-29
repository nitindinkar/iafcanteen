import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
  apiService: any;
  cons: any;
  wishResponse: any;
  
  
  
  ngOnInit(): void {
    this.getWishList();

  }

  getWishList(){
    debugger;
  this.apiService.getApiWithToken(this.cons.api.getWishList).subscribe(
    (response: object) => {
      let result: { [key: string]: any } = response;
      this.wishResponse=result['response'];
      console.log(this.wishResponse);

    },
    (error: any) => {
      console.error('Add wishlist failed:', error);
    }
  );
  }
    

}
