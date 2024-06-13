import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReportModalComponent } from '../report-modal/report-modal.component';

@Component({
  selector: 'app-stylized-button',
  templateUrl: './stylized-button.component.html',
  styleUrls: ['./stylized-button.component.css']
})
export class StylizedButtonComponent {

  constructor(private dialog: MatDialog) { }

  openReportModal() {
    this.dialog.open(ReportModalComponent, {
      width: '600px'
    });
  }
}
