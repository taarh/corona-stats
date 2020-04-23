import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../service/global.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  
  public chartType: string = 'line';
  public timeline:any;
  public caseData :Array<any> =[];
  public tableDeath:Array<any> =[];
  public tableCases:Array<any> =[];
  public tableRecovred:Array<any> =[];

  public tabeStr:Array<any>=[];
  public chartReady:boolean = false;
  
  

  public chartDatasets: Array<any> = [
  // { data: tabeStr, label: 'My First dataset' }
   // { data: [28, 48, 40, 19, 86, 27, 90], label: 'My Second dataset' }
  ];

  public chartLabels: Array<any>=[] ;//['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];
  

  public chartOptions: any = {
    responsive: true
  };
  constructor( private globalService:GlobalService) { }

   ngOnInit() {
    this.lineCharts();
   

  }
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void {

}
  public lineCharts() :void{
    this.globalService.getTimelineGlobal().subscribe( {next:getAllData=> {
      this.timeline=getAllData;
    Object.keys(this.timeline).forEach(key => {

      this.chartLabels.push(key);
      this.tableCases.push(this.timeline[key].cases);
      this.tableDeath.push(this.timeline[key].deaths);
      this.tableRecovred.push(this.timeline[key].recovered);
    });
    
  },
  complete: () => {

    this.chartDatasets.push({data:this.tableCases,label:'Infected'},{data:this.tableDeath,label:'Mort'},{data:this.tableRecovred,label:'Recovred'})
    //console.log("chartLabels :"+this.chartLabels);
   // this.initi();
    //this.chartDatasets.push({data:this.tabeStr,label:'Infected'})
    this.chartReady=true;
  }
},
  
  ); 
  
}

public initi() :void{
  this.tabeStr.push(65);
  this.tabeStr.push(59);
  this.tabeStr.push(80);
  this.tabeStr.push(81);
  this.tabeStr.push(56);
  this.tabeStr.push(55);
  this.tabeStr.push(40);
}

}
