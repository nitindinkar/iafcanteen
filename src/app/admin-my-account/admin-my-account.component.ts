import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared/shared.service';
import { ConstantsService } from '../services/constants/constants.service';
import { ApiCallingServiceService } from '../services/api-calling/api-calling-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-my-account',
  templateUrl: './admin-my-account.component.html',
  styleUrl: './admin-my-account.component.scss',
})
export class AdminMyAccountComponent implements OnInit {
  parsedLoginResponse: any;

  constructor(
    private cons: ConstantsService,
    private apiService: ApiCallingServiceService,
    private router: Router,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    $.getScript('../../assets/js/bootstrap.min.js');
    const defaultTab = document.querySelector('.nav-tabs li:first-child');
    defaultTab?.classList.add('active');

    this.myAccount();
  }

  changeInputType(target: EventTarget | null) {
    if (target instanceof HTMLInputElement) {
      const inputField = target as HTMLInputElement;
      inputField.setAttribute('type', 'date');
      // Remove the focus event listener to prevent subsequent changes
      inputField.removeEventListener('focus', () =>
        this.changeInputType(target)
      );
    }
  }

  setActiveTab(event: MouseEvent) {
    // Remove 'active' class from all tabs
    const tabs = document.querySelectorAll('.nav-tabs li');
    tabs.forEach((tab) => {
      tab.classList.remove('active');
    });

    // Add 'active' class to the clicked tab
    const clickedTab = event.target as HTMLElement;
    clickedTab.parentElement?.classList.add('active');
  }

  myAccount() {
    var loginResponse = this.sharedService.loginResponse;
    if (typeof loginResponse === 'string') {
      this.parsedLoginResponse = JSON.parse(loginResponse);
    }
  }
}
