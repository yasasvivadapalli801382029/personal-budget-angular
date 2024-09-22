import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js/auto';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements AfterViewInit {
  public dataSource: any = {
    datasets: [
      {
        data: [],
        backgroundColor: [
          '#ffcd56',
          '#ff6384',
          '#36a2eb',
          '#fc6b19',
          '#ff5733',
          '#117a65',
          '#9b59b6',
        ],
      },
    ],
    labels: [],
  };
  constructor(
    private http: HttpClient,
    private dataService: DataServiceService
  ) {}

  ngAfterViewInit(): void {
    this.dataService.fetchData().subscribe((res: any) => {
      for (var i = 0; i < res.myBudget.length; i++) {
        this.dataSource.labels.push(res.myBudget[i].title);
        this.dataSource.datasets[0].data.push(res.myBudget[i].budget);
      }
      this.createChart();
    });
  }
  createChart() {
    var ctx = document.getElementById('myChart') as HTMLCanvasElement;
    var myPieChart = new Chart(ctx, {
      type: 'pie',
      data: this.dataSource,
    });
  }
}