import { Component, ViewChild } from '@angular/core';
import { JsonDataService } from '../json-data.service'
import {BaseChartDirective} from 'ng2-charts/ng2-charts';
import { getQueryPredicate } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-fin-dashboard',
  templateUrl: './fin-dashboard.component.html',
  styleUrls: ['./fin-dashboard.component.css'],
})
export class FinDashboardComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  /** Based on the screen size, switch from standard to one column per row */
  public linePredictionLabels:Array<any> = ['October', 'November', 'December','January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September' ];
  public linePredictionData:Array<any> = [{data: [], label: 'Real'}, {data: [], label: 'Predictied'}]

  public linePredictionLegend:boolean = true;
  public linePredictionType:string = 'line';
  public linePredictionColors:Array<any> = [{ // green
    backgroundColor: 'rgba(0,100,0 ,0.2 )',
    borderColor: 'rgba(0,100,0 ,1 )',
    pointBackgroundColor: 'rgba(0,100,0 ,1 )',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(0,100,0 ,0.8 )'
  },{ // red
    backgroundColor: 'rgba(231,76,60 ,0.2)',
    borderColor: 'rgba(231,76,60 ,1)',
    pointBackgroundColor: 'rgba(231,76,60 ,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(231,76,60 ,0.8)'
  }]

  private once: boolean = true;
  updateChart() {
    this.chart.chart.update()
    this.alive_stock = false;
  }
  predict() {
    if (this.once) {
      this.alive_stock = true;
      this.jsonDataService.getPrediction().subscribe(change => {
        change.subscribe(data => {
          console.log (this.linePredictionData[0]['data'])
          var zeros = this.linePredictionData[0]['data'].length - data['data'].length
          console.log(zeros, this.linePredictionData[0]['data'].length, data['data'].length)
          for (var i = 0; i < zeros; i++) {
            this.linePredictionData[1]['data'].push(0)
          }
          for (var i = 0; i < data['data'].length; i++) {
            this.linePredictionData[1]['data'].push(data['data'][i][0])
          }
          this.updateChart()
        })
      })
    }
    this.once = false
  }
  private alive_stock: boolean = true;
  constructor(private jsonDataService: JsonDataService) {
    this.jsonDataService.datum$.subscribe(change => {
      var i = 0
      console.log(change)
      for (var row of change) {
        this.linePredictionData[0]['data'].push(row['open'])
        this.linePredictionLabels[i] = row['date']
        i = i + 1
      }
      this.linePredictionData[0]['data'].reverse()
      this.alive_stock = false

      this.chart.chart.update()

      
    })
  }
}
