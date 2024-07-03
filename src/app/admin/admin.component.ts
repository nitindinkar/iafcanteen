import { SharedService } from './../services/shared/shared.service';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { cilArrowTop, cilOptions } from '@coreui/icons';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit {
  isWidgetsComponentShown: boolean = false;
  faLocation: any;
  faShop: any;
  faBoxes: any;
  faMoneyBill: any;

  constructor(private router: Router, private sharedService: SharedService) {}

  icons = { cilOptions, cilArrowTop };

  data: any = {};
  options: any = {};

  labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
    'January',
    'February',
    'March',
    'April',
  ];

  optionsDefault = {
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: true,
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        min: 30,
        max: 89,
        display: false,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
    elements: {
      line: {
        borderWidth: 1,
        tension: 0.4,
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
  };

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isWidgetsComponentShown = this.router.url.includes('widgets');
      }
    });
  }
}
