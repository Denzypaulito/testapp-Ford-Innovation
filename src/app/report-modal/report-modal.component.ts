import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-report-modal',
  templateUrl: './report-modal.component.html',
  styleUrls: ['./report-modal.component.css']
})
export class ReportModalComponent {
  constructor(private dialogRef: MatDialogRef<ReportModalComponent>) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
