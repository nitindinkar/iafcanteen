import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.scss'
})
export class MyAccountComponent implements OnInit {
  



  showRegistrationForm: boolean = false; 
  showLoginForm: boolean = true;
  ngOnInit(): void {
    $.getScript('../../assets/js/bootstrap.min.js');
    const defaultTab = document.querySelector('.nav-tabs li:first-child');
    defaultTab?.classList.add('active');
    
  }

  setActiveTab(event: MouseEvent) {
    // Remove 'active' class from all tabs
    const tabs = document.querySelectorAll('.nav-tabs li');
    tabs.forEach(tab => {
      tab.classList.remove('active');
    });

    // Add 'active' class to the clicked tab
    const clickedTab = event.target as HTMLElement;
    clickedTab.parentElement?.classList.add('active');
  }
  changeInputType(target: EventTarget | null) {
    if (target instanceof HTMLInputElement) {
      const inputField = target as HTMLInputElement;
      inputField.setAttribute('type', 'date');
      // Remove the focus event listener to prevent subsequent changes
      inputField.removeEventListener('focus', () => this.changeInputType(target));
    }
  }

}
