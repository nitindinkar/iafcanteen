import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartItem, registerables } from 'chart.js';
import { SharedService } from '../services/shared/shared.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {

  constructor(private sharedService:SharedService){}
  ngOnInit(): void {
    if(this.sharedService.loggedIn == true){
      window.location.reload();
    }
  }
  
 
  ngAfterViewInit():void {
    Chart.register(...registerables);
    const data = {
      labels: ['Total Products', 'Total Catagory', 'Total Orders', 'Delivered Order','Cancel Order'],
      datasets: [{
        data: [400, 50, 250, 200, 45],
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
  labels:['Total Products', 'Total Catagory', 'Total Orders', 'Delivered Order','Cancel Order'],
  datasets:[{
    data: [400, 50, 250, 200, 45],
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
