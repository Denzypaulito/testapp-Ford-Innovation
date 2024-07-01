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
  pilas = Array.from({ length: 13 }, (_, i) => (i + 1).toString());
  searchQuery: string = '';
  highlightedRack: string | null = null;

  rack_detail_visible = false;
  create_report_visible = false;
  search_rack_visible = false;
  pila_selection_visible = false;
  checkout_rack_visible = false;

  report: Report = new Report();
  reports: Report[] = [];

  searched_reports: Report[] = [];

  openRack: number = 0;
  rack_detail_reports: any[] = [];
  checkoutRackNumber: string = '';
  checkoutLocation: string = 'Dino';
  otherWarehouseName: string = '';
  checkoutInTransit: boolean = false;

  enginesTemp: string = '';

  isCreatingReport: boolean = false;
  searched = false;

  show_motor_list = false;
  motor_list: Report[] = [];

  constructor(private dataService: DataService) { }

  processMotorString(m: string) {
    return m.split(',');
  }

  searchRack(): void {
    this.searched = false;
    this.dataService.findRack(this.searchQuery).subscribe((data: Report[]) => {
      this.searched_reports = data;
      this.searched = true;
    });
  }

  getShipmentClass(shipmentDate: Date): string {
    const currentDate = new Date();
    const shipment = new Date(shipmentDate);
    const differenceInDays = Math.floor((currentDate.getTime() - shipment.getTime()) / (1000 * 60 * 60 * 24));
    if (differenceInDays > 14) {
      return 'red'; // More than 14 days
    } else if (differenceInDays > 7) {
      return 'yellow'; // Between 7 and 14 days
    } else {
      return 'green'; // 7 days or less
    }
  }

  openCreateReport() {
    this.create_report_visible = true;
  }

  openSearchRack() {
    this.search_rack_visible = true;
  }

  openCheckoutRack() {
    this.checkout_rack_visible = true;
  }

  openPilaSelection() {
    this.pila_selection_visible = true;
  }

  openMotorList() {
    this.show_motor_list = true;
    this.dataService.getData().subscribe((data: Report[]) => {
      this.motor_list = data;
    });
  }

  openRackDetail(event: any) {
    this.rack_detail_visible = true;
    this.openRack = event;
    this.dataService.getDataByRow(this.openRack).subscribe((data: Report[]) => {
      this.reports = data;
    });
  }

  onLocationChange(event: any) {
    this.checkoutLocation = event.target.value;
  }

  onCheckoutRack() {
    if(this.checkoutLocation === 'Dino') {
      this.otherWarehouseName = 'Dino';
    }
    this.dataService.changeRackStatus(this.checkoutRackNumber, this.checkoutInTransit, this.otherWarehouseName).subscribe({
      next: (response) => {
        if (response.modified === 1) {
          window.alert('Se ha actualizado con éxito!');
          location.reload();
        } else {
          window.alert('No se ha podido actualizar el rack');
        }
      }
    });
  }

  onSubmitReport() {
    if(this.isCreatingReport) return;
    this.isCreatingReport = true;
    this.report.engines = this.processMotorString(this.enginesTemp);
    this.dataService.saveReport(this.report).subscribe({
      next: (response) => {
        window.alert('Se ha guardado con éxito!');
        this.isCreatingReport = false;
        location.reload();
        
      }
    });
  }

}
