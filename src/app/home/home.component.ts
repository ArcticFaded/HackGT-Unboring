import {Component} from '@angular/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  title: string;
  subTitle?: string;
  subSubTitle?: string;
}

/**
 * @title Dynamic grid-list
 */
@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})
export class HomeComponent {
    public lineChartData:Array<any> = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
        {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
    ];
    public radarChartLabels:string[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];
 
    public radarChartData:any = [
        {data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A'},
        {data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B'}
    ];
    public radarChartType:string = 'radar';
        // Pie
    public pieChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
    public pieChartData:number[] = [300, 500, 100];
    public pieChartType:string = 'pie';
    
    public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public lineChartOptions:any = {
    responsive: true
    };
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
    { // grey
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
    ];
    public lineChartLegend:boolean = true;
    public lineChartType:string = 'line';
    
    public randomize():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
        _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
        for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
        }
    }
    this.lineChartData = _lineChartData;
    }
    
    // events
    public chartClicked(e:any):void {
    console.log(e);
    }
    
    public chartHovered(e:any):void {
    console.log(e);
    }
  tiles: Tile[] = [
    {text: '"Making Transactional Data Unboring"', cols: 4, rows: 1, color: 'white', title: 'bar'},
    {text: 'One', cols: 2, rows: 5, color: 'white', title: 'row1-graph'},
    {text: 'Line graphs that show "Trends"', subTitle: 'See changes live from your POS or tracking systems!', cols: 2, rows: 5, color: 'white', title: 'row1'},
    {text: "Don't want line graphs? How about PIE CHARTS!", subTitle: 'There is more than one technique to gaining insight on your data', cols: 2, rows: 5, color: 'white', title: 'row2'},
    {text: 'Four', cols: 2, rows: 5, color: 'white', title: 'row2-graph'},
    {text: 'Five', cols: 2, rows: 5, color: 'white', title: 'row3-graph'},
    {text: 'Not even Pie Charts? How about whatever this is!', subTitle: 'Seriously though, the job of any analytic tool is the ability', subSubTitle: "to tell stories through data!", cols: 2, rows: 5, color: 'white', title: 'row3'}
  ];
}