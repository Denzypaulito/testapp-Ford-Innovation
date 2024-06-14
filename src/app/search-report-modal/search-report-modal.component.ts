import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../data.service';

@Component({
  selector: 'app-search-report-modal',
  templateUrl: './search-report-modal.component.html',
  styleUrls: ['./search-report-modal.component.css']
})
export class SearchReportModalComponent {
  searchQuery: string = '';
  reports: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<SearchReportModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { buttonName: string },
    private dataService: DataService
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  searchRack(): void {
    this.dataService.getData().subscribe(data => {
      this.reports = []; // Reset previous search results
      for (let rack of ['1', '2', '3', '4', '5', '6']) {
        const racksData = data.filter((item: any) => item.ubicacion === rack);
        const found = racksData.filter((item: any) => item.rack === this.searchQuery);
        if (found.length > 0) {
          this.reports = found;
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
}
