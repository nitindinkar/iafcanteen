import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared/shared.service';

@Component({
  selector: 'app-liquor-home',
  templateUrl: './liquor-home.component.html',
  styleUrl: './liquor-home.component.scss',
})
export class LiquorHomeComponent implements OnInit {
  ngOnInit(): void {
    debugger;
    if (this.sharedService.loggedIn == true) {
      window.location.reload();
    }
  }

  constructor(private sharedService: SharedService) {}
}
