import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Report } from './report.model';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {
  reports: Report[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getData().subscribe(data => {
      this.reports = data;
    });
  }

  searchReports() {
    this.dataService.getData().subscribe(data => {
      this.reports = data;
    });
  }

  viewReports() {
    this.dataService.getData().subscribe(data => {
      this.reports = data;
    });
  }

  getShipmentClass(shipmentDate: string): string {
    const currentDate = new Date();
    const shipment = new Date(shipmentDate);
    const differenceInDays = Math.floor((currentDate.getTime() - shipment.getTime()) / (1000 * 60 * 60 * 24));

    if (differenceInDays > 60) {
      return 'red';
    } else if (differenceInDays > 30) {
      return 'yellow';
    } else {
      return 'green';
    }
  }
}
