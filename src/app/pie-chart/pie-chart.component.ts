import { Component, Input } from '@angular/core';
import Chart from 'chart.js/auto';
import { Employees } from '../app.component';


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


  ngOnInit(): void {
    this.createChart();
  }

  createChart() {

    let employeesNames: string[] = [];
    let employeesWorkingHours: number[] = [];
    this.employees.forEach(employee => {
      employeesNames.push(employee.EmployeeName);
      employeesWorkingHours.push(employee.WorkingHours);
    });


    this.chart = new Chart("MyChart", {
      type: 'pie', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: employeesNames,//['Red', 'Pink','Green','Yellow','Orange','Blue', ],
        datasets: [{
          label: 'My First Dataset',
          data: employeesWorkingHours,//[300, 240, 100, 432, 253, 34],
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
          hoverOffset: 4
        }],
      },
      options: {
        aspectRatio: 2.5
      }

    });
  }
}
