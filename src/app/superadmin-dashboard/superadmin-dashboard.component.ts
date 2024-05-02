import { SharedService } from './../services/shared/shared.service';
import { CommonService } from './../services/common/common.service';
import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartItem, registerables } from 'chart.js';

@Component({
  selector: 'app-superadmin-dashboard',
  templateUrl: './superadmin-dashboard.component.html',
  styleUrl: './superadmin-dashboard.component.scss'
})
export class SuperadminDashboardComponent implements OnInit{

  constructor(private sharedService:SharedService){}
  
  ngOnInit(): void {
    if(this.sharedService.loggedIn == true){
      window.location.reload();
    }
  }

  ngAfterViewInit():void {
    Chart.register(...registerables);
    const data = {
      labels: ['Active Admins ', 'Deactive Admins ', 'Active Stores', 'Deactive Stores','Total Admins'],
      datasets: [{
        data: [200, 150, 250, 100, 450],
          backgroundColor: [
            '#1cc88a',
            '#4e73df',
            '#36b9cc',
            '#e74a3b',
            'rgb(248, 108, 107)',
          ],
          label:'E-URC'

        },
    ]
};
const options = {
  scales: {
    y: {
      beginAtZero: true,
      display: true
    }
  },
  legends:{
    display:false
  }
}
const config: ChartConfiguration = {
  type: 'bar',
  data: data,
  options: options
}
const chartItem: ChartItem = document.getElementById('my-chart') as ChartItem
new Chart(chartItem, config)



const data2 = {
  labels:['Active Admins ', 'Deactive Admins ', 'Active Stores', 'Deactive Stores','Total Admins'],
  datasets:[{
    data: [200, 150, 250, 100, 450],
    backgroundColor: [
      '#1cc88a',
            '#4e73df',
            '#36b9cc',
            '#e74a3b',
            'rgb(248, 108, 107)',
          ],
           fill: true,
  }]
};
const options2 = {
  scales: {
    y: {
      beginAtZero: true,
      display: false
    }
  },
}
const config2: ChartConfiguration = {
  type: 'polarArea',
  data: data2,
  options: options2
}
Chart.overrides.polarArea.plugins.legend.position = 'left';
Chart.overrides.polarArea.aspectRatio=1.4;
const chartItem2: ChartItem = document.getElementById('my-chart2') as ChartItem
new Chart(chartItem2, config2)

}

}
