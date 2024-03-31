import { Component, OnInit } from '@angular/core';
import { ConstantsService } from '../services/constants/constants.service';
import { ApiCallingServiceService } from '../services/api-calling/api-calling-service.service';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared/shared.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
 
  
  wishResponse: any;


  constructor(public cons:ConstantsService,
    private apiService: ApiCallingServiceService,
    private router: Router,
    private sharedService: SharedService) {
}
  
  
  
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
