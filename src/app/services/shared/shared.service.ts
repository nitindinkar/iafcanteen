import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ApiCallingServiceService} from "../api-calling/api-calling-service.service";
import {ConstantsService} from "../constants/constants.service";
import {CommonService} from "../common/common.service";

 type ItemTotals = Record<string, number>;
@Injectable({
  providedIn: 'root'
})



export class SharedService {

  public cardType: string|undefined; // Property to hold the shared value
  public loginResponse=localStorage.getItem('loginResponse');
  public userId=localStorage.getItem('userId');
  public userName=localStorage.getItem('userName');
  public mobile=localStorage.getItem('contactNumber');
  public cartTotal: any;
  public cart: any;
  selectedCategory: any;
  loggedIn: boolean=false;
  searchKey: string='';
  role: any;
  cartCount:any;
  wishListCount:any;
  cartItems: any;
  cartList=[];
  
  alternateNumber: any;
  filteredProducts: any;
 
  
  constructor(
    private router: Router,
    private http: HttpClient,
    private apiService: ApiCallingServiceService,
    private cons: ConstantsService,
    private common: CommonService,
  ) {}

}
