import { Component, OnInit, NgZone } from '@angular/core';
import { GlobalService } from '../service/global.service';
import { CountryService } from '../service/country.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Global } from '../entities/global';
import { GlobalByCountry } from '../entities/globalByCountry';
import { switchMap } from 'rxjs/operators';
import {
  combineLatest
} from 'rxjs';
import { Country } from '../entities/country';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

  public chartType: string = 'line';
  public timeline: any;
  public caseData: Array<any> = [];
  public tableDeath: Array<any> = [];
  public tableCases: Array<any> = [];
  public tableRecovred: Array<any> = [];
  public totalCases = 0;
  public totalDeaths = 0;
  public totalRecoveries;
  public totalCritical;
  public todayCases;
  public todayDeaths;
  public activeCases;
  public casesPer1M;
  public finishedCases;
  public tabeStr: Array<any> = [];
  public chartReady: boolean = false;
  public global: Country;
  public nameTimeline: string = "";
  public chartDatasetRadar: Array<any> = [];
  public chartLabelsRadar: Array<any>=[];



  public chartDatasets: Array<any> = [
    // { data: tabeStr, label: 'My First dataset' }
    // { data: [28, 48, 40, 19, 86, 27, 90], label: 'My Second dataset' }
  ];

  public chartLabels: Array<any> = [];//['January', 'February', 'March', 'April', 'May', 'June', 'July'];

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

  constructor(private globalService: GlobalService, private route: ActivatedRoute, private zone: NgZone) { }

  ngOnInit(): void {
    //  this.zone.runOutsideAngular(() => {
    let nameTimeline = this.route.snapshot.paramMap.get("name").toLowerCase();
    console.log("nameTimeLine=" + nameTimeline);
    if (nameTimeline == "usa") {
      nameTimeline = "us";
    } else if (nameTimeline == "taiwan") {
      nameTimeline = "taiwan*";
    } else if (nameTimeline == "isle of man") {
      nameTimeline = "united kingdom";
    } else if (nameTimeline == "aruba") {
      nameTimeline = "netherlands";
    } else if (nameTimeline == "sint maarten") {
      nameTimeline = "netherlands";
    } else if (nameTimeline == "st. vincent grenadines") {
      nameTimeline = "saint vincent and the grenadines";
    } else if (nameTimeline == "timor-leste") {
      nameTimeline = "East Timor";
    } else if (nameTimeline == "montserrat") {
      nameTimeline = "united kingdom";
    } else if (nameTimeline == "gambia") {
      nameTimeline = "gambia, the";
    } else if (nameTimeline == "cayman islands") {
      nameTimeline = "united kingdom";
    } else if (nameTimeline == "bermuda") {
      nameTimeline = "united kingdom";
    } else if (nameTimeline == "greenland") {
      nameTimeline = "denmark";
    } else if (nameTimeline == "st. barth") {
      nameTimeline = "saint barthelemy";
    } else if (nameTimeline == "congo") {
      nameTimeline = "congo (brazzaville)";
    } else if (nameTimeline == "saint martin") {
      nameTimeline = "france";
    } else if (nameTimeline == "gibraltar") {
      nameTimeline = "united kingdom";
    } else if (nameTimeline == "mayotte") {
      nameTimeline = "france";
    } else if (nameTimeline == "bahamas") {
      nameTimeline = "bahamas, the";
    } else if (nameTimeline == "french guiana") {
      nameTimeline = "france";
    } else if (nameTimeline == "u.s. virgin islands") {
      nameTimeline = "us";
    } else if (nameTimeline == "curaçao") {
      nameTimeline = "netherlands";
    } else if (nameTimeline == "puerto rico") {
      nameTimeline = "us";
    } else if (nameTimeline == "french polynesia") {
      nameTimeline = "france";
    } else if (nameTimeline == "ivory coast") {
      nameTimeline = "Cote d'Ivoire";
    } else if (nameTimeline == "macao") {
      nameTimeline = "china";
    } else if (nameTimeline == "drc") {
      nameTimeline = "congo (kinshasa)";
    } else if (nameTimeline == "channel islands") {
      nameTimeline = "united kingdom";
    } else if (nameTimeline == "réunion") {
      nameTimeline = "france";
    } else if (nameTimeline == "guadeloupe") {
      nameTimeline = "france";
    } else if (nameTimeline == "faeroe islands") {
      nameTimeline = "Denmark";
    } else if (nameTimeline == "uae") {
      nameTimeline = "United Arab Emirates";
    } else if (nameTimeline == "diamond princess") {
      nameTimeline = "australia";
    } else if (nameTimeline == "hong kong") {
      nameTimeline = "china";
    } else if (nameTimeline == "uk") {
      nameTimeline = "united kingdom";
    } else if (nameTimeline == "car") {
      nameTimeline = "central african republic";
    }

    combineLatest(
      this.globalService.getTimelineCountry(nameTimeline),
      this.globalService.getCountry(this.route.snapshot.paramMap.get("name"))
    )
      .subscribe(([getTimelineData, getAllData]) => {
        console.log("this.timeline" + this.nameTimeline)
        this.timeline = getTimelineData;
        this.global = getAllData;
        this.finishedCases=this.global.deaths+this.global.recovered;
        console.log(this.timeline.name)
        this.loadLineChart();
        this.loadRadar();

      })
  }
  loadLineChart() {
    let caseData = [];
    if (!this.timeline.multiple) {
      caseData = this.timeline.data.timeline;

      Object.keys(caseData).forEach(key => {
        this.chartLabels.push(caseData[key].date);
        this.tableCases.push(caseData[key].cases);
        this.tableDeath.push(caseData[key].deaths);
        this.tableRecovred.push(caseData[key].recovered);
      });
    } else {
      let data = {};
      this.timeline.data.forEach(async element => {
        element.timeline.forEach(async o => {
          if (!data.hasOwnProperty(o.date)) {
            data[o.date] = {};
            data[o.date]["cases"] = 0;
            data[o.date]["deaths"] = 0;
            data[o.date]["recovered"] = 0;
          }
          data[o.date].cases += parseInt(o.cases);
          data[o.date].deaths += parseInt(o.deaths);
          data[o.date].recovered += parseInt(o.recovered);
        });
      });
      console.log("data :" + data)
      Object.keys(data).forEach(key => {
        this.chartLabels.push(new Date(key));
        this.tableCases.push(data[key].cases);
        this.tableDeath.push(data[key].deaths);
        this.tableRecovred.push(data[key].recovered);
      });
    }
    this.chartDatasets.push({ data: this.tableCases, label: 'Infected' }, { data: this.tableDeath, label: 'Mort' }, { data: this.tableRecovred, label: 'Recovred' })
    console.log("Table cases :" + this.tableCases)
    this.chartReady = true;
  }


  public chartClicked(e: any): void { }
  public chartHovered(e: any): void {

  }

  loadRadar(){
     this.chartDatasetRadar.push(
      { data: [this.global.critical / this.global.active * 100, this.global.deaths / this.finishedCases * 100, this.global.recovered / this.finishedCases * 100, 100 - (this.global.critical / this.global.active * 100)], label: 'My First dataset' },
     )
    this.chartLabelsRadar=['Critical', 'Death', 'Recovered', 'Active'];
    console.log("DataSET:"+this.chartDatasetRadar[0].data)[0];
  
  }
}