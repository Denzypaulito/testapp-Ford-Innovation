import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Report } from './report.model';
import { ReportModalComponent } from '../report-modal/report-modal.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {
  reports: Report[] = [];

  @Input() ubicacion_id: string = '';

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getDataByUbicacion(this.ubicacion_id).subscribe((data: any[]) => {
      this.reports = data.map((v) => {
        return {
          engineNumber: this.processMotorString(v.motor),
          rackNumber: v.rack,
          locationNumber: v.ubicacion,
          shipmentDate: v.fechaEmbarque
        };
      });
    });
  }

  processMotorString(m: string) {
    return m.split(',');
  }

  searchReports() {
    alert('no sirvo :(');
    this.dataService.getDataByUbicacion(this.ubicacion_id).subscribe((data: any[]) => {
      this.reports = data.map((v) => {
        return {
          engineNumber: v.motor,
          rackNumber: v.rack,
          locationNumber: v.ubicacion,
          shipmentDate: v.fechaEmbarque
        };
      });
    });
  }

  viewReports() {
    this.dataService.getDataByUbicacion(this.ubicacion_id).subscribe((data: any[]) => {
      this.reports = data.map((v) => {
        return {
          engineNumber: v.motor,
          rackNumber: v.rack,
          locationNumber: v.ubicacion,
          shipmentDate: v.fechaEmbarque
        };
      });
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
