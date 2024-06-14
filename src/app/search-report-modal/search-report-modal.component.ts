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
  searchResult: any = null;

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
      this.searchResult = null; // Reset previous search result
      for (let rack of ['A', 'B', 'C', 'D', 'E', 'F']) {
        const racksData = data.filter((item: any) => item.ubicacion === rack);
        const found = racksData.find((item: any) => item.rack === this.searchQuery);
        if (found) {
          this.searchResult = found;
          break;
        }
      }
    });
  }
}
