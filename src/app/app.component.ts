import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employees, Entries } from './employees/employees.component';

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
 

  constructor() {

  }

  ngOnInit() {
    
  }
  
}