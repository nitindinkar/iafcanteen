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
  
  private subtotal: number = 0;
  private itemTotals: ItemTotals = {};
  setItemTotal: any;
  
  

  public cardType: string|undefined; // Property to hold the shared value
  public loginResponse=localStorage.getItem('loginResponse');
  constructor(
    private router: Router,
    private http: HttpClient,
    private apiService: ApiCallingServiceService,
    private cons: ConstantsService,
    private common: CommonService,
  ) {}

}
