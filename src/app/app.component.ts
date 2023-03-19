import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})





export class AppComponent implements OnInit {
  title = 'Employees';
  headers = ["Name", "Total Time in Month", "Actions"];
  entries = [] as Array<Entries>;
  employees = [] as Array<Employees>;
 

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.fetchEntries();
  }


  private fetchEntries() {
    this.http.get('https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==').
      subscribe((res) => {
        //console.log(res);
        let jsonObj = JSON.parse(JSON.stringify(res)); // string to "any" object first
        this.entries = jsonObj as Entries[];
        //console.log(this.entries);
        this.calcWorkingHours();
      });

  }

  
  private calcWorkingHours() {

    this.entries.forEach(entry => {
      
      if (this.employees.find(x => x.EmployeeName === entry.EmployeeName) === undefined) {
        if (entry.EmployeeName !== null) {
          let time = Math.abs((new Date(entry.StarTimeUtc)).getTime() - (new Date(entry.EndTimeUtc)).getTime());
          const modal: Employees = {
            EmployeeName: entry.EmployeeName,
            WorkingHours: time
          }
          this.employees.push(modal);
        }
      }
      else {
        let time = Math.abs((new Date(entry.StarTimeUtc)).getTime() - (new Date(entry.EndTimeUtc)).getTime());
        let existingEmployee = this.employees.find(x => x.EmployeeName === entry.EmployeeName);
        if (existingEmployee !== undefined)
          existingEmployee.WorkingHours = existingEmployee.WorkingHours + time;
      }
    });

    this.employees.forEach(employee => {
      employee.WorkingHours = convertMsToTime(employee.WorkingHours);
    });

  }
}

function convertMsToTime(milliseconds: number) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  if (minutes > 30)
    return hours + 1; // if worked more that 30mins after full hour - return one hour more
  return hours; // else return full number of calculater hours
}

export interface Entries {
  Id: string
  EmployeeName: string
  StarTimeUtc: string
  EndTimeUtc: string
  EntryNotes: string
  DeletedOn: any
}

export interface Employees {
  EmployeeName: string
  WorkingHours: number
}