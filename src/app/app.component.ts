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
  reports: any[] = [];

  openRack: string = '';
  rack_detail_reports: any[] = [];
  checkoutRackNumber: string = '';
  checkoutLocation: string = 'Dino';
  otherWarehouseName: string = '';

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

    if (differenceInDays > 14) {
      return 'text-danger'; // More than 14 days
    } else if (differenceInDays > 7) {
      return 'text-warning'; // Between 7 and 14 days
    } else {
      return 'text-success'; // 7 days or less
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

  openRackDetail(event: any) {
    this.rack_detail_visible = true;
    this.openRack = event;
    this.dataService.getData().subscribe((data: Report[]) => {
      const reports = data.filter((item: Report) => item.locationNumber === event);
      this.rack_detail_reports = reports.map((v:Report) => {
        return {
          engineNumber: this.processMotorString(v.engineNumber),
          rackNumber: v.rackNumber,
          locationNumber: v.locationNumber,
          shipmentDate: v.shipmentDate
        };
      });
    });
  }

  onSubmitReport() {
    this.dataService.saveReport(this.report).subscribe(response => {
      console.log('Report saved:', response);
      this.create_report_visible = false; // Close dialog after saving
      this.report = new Report(); // Reset form
    }, error => {
      console.error('Error saving report:', error);
    });
  }

  selectPila(pila: string) {
    this.report.pilaNumber = pila;
    this.pila_selection_visible = false; // Close dialog after selection
  }

  onLocationChange(event: any) {
    this.checkoutLocation = event.target.value;
  }

  onCheckoutRack() {
    const updatedLocation = this.checkoutLocation === 'Dino' ? 'Dino' : this.otherWarehouseName;
    if (this.checkoutRackNumber && updatedLocation) {
      this.dataService.updateRackLocation(this.checkoutRackNumber, updatedLocation).subscribe(response => {
        console.log('Rack location updated:', response);
        this.checkout_rack_visible = false; // Close dialog after updating
        this.checkoutRackNumber = ''; // Reset form
        this.checkoutLocation = 'Dino'; // Reset location
        this.otherWarehouseName = ''; // Reset other warehouse name
      }, error => {
        console.error('Error updating rack location:', error);
      });
    }
  }
}
