import { Component, VERSION ,ViewChild,OnInit } from '@angular/core';
import {ChartComponent,ApexAxisChartSeries,ApexChart,ApexYAxis,ApexXAxis,ApexTitleSubtitle} from "ng-apexcharts";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  
};

export type LineChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent  implements OnInit{

  
  title = 'Securities-Monitor';


  
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions;

  @ViewChild("line") line: ChartComponent;
  public lineChartOptions;


  public updateSeries(data) {
    this.chartOptions.series = [{
      data: data.data
    }];
  }

  public updateLine(data) {
    this.lineChartOptions.series = [{
      data: data.data
    }];
  }

  public getChartData(sym){
    let headers = new HttpHeaders({});

    headers.append("Accept", "text/plain");
        
    let symbol =this.nameForm.get('name')?.value;

    this.http
      .get<any>('https://localhost:44329/Securities/getchartdata?symbol=' + sym , {
        headers: headers
      })
      .subscribe(data => {
        this.updateSeries(data)

      });

      this.http
      .get<any>('https://localhost:44329/Securities/getvolumedata?symbol=' + sym , {
        headers: headers
      })
      .subscribe(data => {
        this.updateLine(data)

      });
  }


  public nameForm:FormGroup;
  myusername: string = "";

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {

    this.nameForm = this.formBuilder.group({
      name: ''
    });


    this.getChartData("AMZN");

    this.chartOptions = {
      series: [
        {
          name: "candle",
          data: []
        }
      ],
      chart: {
        type: "candlestick",
        height: 350
      },
      title: {
        text: "",
        align: "left"
      },
      xaxis: {
        type: "datetime"
      },
      yaxis: {
        tooltip: {
          enabled: true
        }
      }
    };

    this.lineChartOptions = {
      series: [
        {
          name: "line",
          data: []
        }
      ],
      chart: {
        type: "line",
        height: 350
      },
      title: {
        text: "",
        align: "left"
      },
      xaxis: {
        type: "datetime"
      },
      yaxis: {
        tooltip: {
          enabled: true
        }
      }
    };
    

 
}

  ngOnInit(){

    
  }

  

  
}
