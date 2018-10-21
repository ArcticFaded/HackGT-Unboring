import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NameDataSource } from './name-datasource';
import { JsonDataService } from '../json-data.service'
import {BaseChartDirective} from 'ng2-charts/ng2-charts';

@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.css'],
})
export class NameComponent{
  
  public lineChartData:Array<any> = [{data: [], label: 'JNPR - Financial Return Score'}, {data: [], label: 'JNPR - Growth Score'}, {data: [], label: 'JNPR - Multiplier Score'}, {data: [], label: 'JNPR - Integrated Score'}];
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  
  public lineChartLabels:Array<any> = ['October', 'November', 'December','January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September' ];
  public lineChartOptions:any = {
    responsive: true
  };
  public linePredictionOptions:any = {
    responsive: true
  };
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  public lineChartColors:Array<any> = [
    { // grey
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
  { // green
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
  }
  ]
  
  // events on slice click
  public chartClicked(e:any):void {
    console.log(e);
  }
 
 // event on pie chart slice hover
  public chartHovered(e:any):void {
    console.log(e);
  }
  // events on slice click
  public predictionClicked(e:any):void {
    console.log(e);
  }
 
 // event on pie chart slice hover
  public predictionHovered(e:any):void {
    console.log(e);
  }
  // ngOnInit() {
  //   this.dataSource = new NameDataSource(this.paginator, this.sort);
  // }

  private alive: boolean = true;
  constructor(private jsonDataService: JsonDataService, private ref: ChangeDetectorRef) {
    this.jsonDataService.nodes$.subscribe(change => {
      this.lineChartData[0]['label'] = 'PNRY'
      var i = 0
      for (var row of change) {
        // console.log(row)

        this.lineChartData[0]['data'].push(row['financialReturnsScore'])
        this.lineChartData[1]['data'].push(row['growthScore'])
        this.lineChartData[2]['data'].push(row['multipleScore'])
        this.lineChartData[3]['data'].push(row['integratedScore'])
        this.lineChartLabels[i] = row['date']
        i = i + 1
        
      }
      this.alive = false
      console.log(this.lineChartData)
      this.chart.chart.update()
    })
  }
}
