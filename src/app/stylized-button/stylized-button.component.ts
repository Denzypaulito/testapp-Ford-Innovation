import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReportModalComponent } from '../report-modal/report-modal.component';
import { CreateReportModalComponent } from '../create-report-modal/create-report-modal.component';

@Component({
  selector: 'app-stylized-button',
  templateUrl: './stylized-button.component.html',
  styleUrls: ['./stylized-button.component.css']
})
export class StylizedButtonComponent {
  @Input() buttonName: string = 'Click Me';
  @Input() action: 'create' | 'view' = 'view';
  @Input() ubicacion_id: string = '';

  constructor(private dialog: MatDialog) { }

  openModal() {
    if (this.action === 'create') {
      this.dialog.open(CreateReportModalComponent, {
        width: '600px',
        data: { buttonName: this.buttonName }
      });
    } else {
      let dref = this.dialog.open(ReportModalComponent, {
        width: '600px',
        data: { buttonName: this.buttonName}
      });
      dref.componentInstance.ubicacion_id = this.ubicacion_id;
    }
  }
}
