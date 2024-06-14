import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SearchReportModalComponent } from '../search-report-modal/search-report-modal.component';

@Component({
  selector: 'app-stylized-button-search',
  templateUrl: './stylized-button-search.component.html',
  styleUrls: ['./stylized-button-search.component.css']
})
export class StylizedButtonSearchComponent {
  @Input() buttonName: string = 'Buscar Rack';

  constructor(private dialog: MatDialog) { }

  openSearchModal() {
    this.dialog.open(SearchReportModalComponent, {
      width: '600px',
      data: { buttonName: this.buttonName }
    });
  }
}
