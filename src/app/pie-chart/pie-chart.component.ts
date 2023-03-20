import { Component, Input } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Employees } from '../app.component';
import "chartjs-plugin-datalabels";
//import { NgChartsModule } from 'ng2-charts';
//import * as pluginDataLabels from 'chartjs-plugin-datalabels';


@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent {
  public chart: any;
  @Input() employees = [] as Array<Employees>;


  //constructor(private appComponent: AppComponent) {
  //this.employees = appComponent.employees;
  // }

  //public chartPlugins = [pluginDataLabels];




  ngOnInit(): void {
    this.createChart();
  }

  createChart() {

    let employeesNames: string[] = [];
    let employeesWorkingHours: number[] = [];
    let employeesPercentage: number[] = [];

    this.employees.forEach(employee => {
      if (employee.EmployeeName !== null) {
        employeesNames.push(employee.EmployeeName);
        employeesWorkingHours.push(employee.WorkingHours);
        employeesPercentage.push(employee.Percentage);
      }
    });


    this.chart = new Chart("MyChart", {
      type: 'pie', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: employeesNames, //['Red', 'Pink','Green','Yellow','Orange','Blue', ],
        datasets: [{
          label: 'Percentage',
          data: employeesPercentage, //[300, 240, 100, 432, 253, 34],
          backgroundColor: [
            'red',
            'pink',
            'green',
            'yellow',
            'orange',
            'blue',
            'gray',
            'purple',
            'black',
            'maroon'
          ],
          hoverOffset: 4,
        }],
      },
      options: {
        aspectRatio: 2.5,
        plugins: {
          datalabels: {
            display: true,
            align: 'bottom',
            backgroundColor: '#ccc',
            borderRadius: 3,
            font: {
              size: 18,
            }
          }
        }
      }
    });
  }
}
