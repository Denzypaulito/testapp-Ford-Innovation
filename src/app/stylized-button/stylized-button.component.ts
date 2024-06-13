import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReportModalComponent } from '../report-modal/report-modal.component';

@Component({
  selector: 'app-stylized-button',
  templateUrl: './stylized-button.component.html',
  styleUrls: ['./stylized-button.component.css']
})
export class StylizedButtonComponent {
  @Input() buttonName: string = 'Click Me';

  constructor(private dialog: MatDialog) { }

  openReportModal() {
    this.dialog.open(ReportModalComponent, {
      width: '600px',
      data: { buttonName: this.buttonName }
    });
  }
}
