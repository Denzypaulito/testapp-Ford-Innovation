import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Report } from './models/report.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'testapp';
  numeros = Array.from({ length: 27 }, (_, i) => (i + 1).toString());
  searchQuery: string = '';
  highlightedRack: string | null = null;

  rack_detail_visible = false;
  create_report_visible = false;
  search_rack_visible = false;

  report: Report = new Report();

  reports: any[] = [];

  openRack: string = '';
  rack_detail_reports: any[] = [];

  constructor(private dataService: DataService) { }

  processMotorString(m: string) {
    return m.split(',');
  }

  searchRack(): void {
    this.dataService.getData().subscribe((data: Report[]) => {
      this.reports = []; // Reset previous search results
      for (let rack of this.numeros) {
        const racksData = data.filter((item: Report) => item.locationNumber === rack);
        const found = racksData.filter((item: Report) => item.rackNumber === this.searchQuery);
        if (found.length > 0) {
          this.reports = found.map((v:Report) => {
        return {
          engineNumber: this.processMotorString(v.engineNumber),
          rackNumber: v.rackNumber,
          locationNumber: v.locationNumber,
          shipmentDate: v.shipmentDate
        };
      });
          break;
        }
      }
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

  openRackDetail(num: string) {
    this.openRack = num;
    this.rack_detail_reports = [];
    this.dataService.getDataByUbicacion(num).subscribe((data: any[]) => {
      this.rack_detail_reports = data.map((v) => {
        return { 
          engineNumber: this.processMotorString(v.engineNumber),
          rackNumber: v.rackNumber,
          locationNumber: v.locationNumber,
          shipmentDate: v.shipmentDate
        };
      });
    });
    this.rack_detail_visible = true;
    
  }

  openCreateReport() {
    this.create_report_visible = true;
  }

  openSearchRack() {
    this.search_rack_visible = true;
  }

  onSubmitReport() {
    this.dataService.createData(this.report).subscribe(response => {
      console.log('Reporte creado:', response);
      this.create_report_visible = false;
    }, error => {
      console.error('Error al crear el reporte:', error);
    });
  }

}
