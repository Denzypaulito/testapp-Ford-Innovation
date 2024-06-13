import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-report-modal',
  templateUrl: './create-report-modal.component.html',
  styleUrls: ['./create-report-modal.component.css']
})
export class CreateReportModalComponent {

  dialRef?: MatDialogRef<CreateReportModalComponent>;

  constructor(
    private dialogRef: MatDialogRef<CreateReportModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { buttonName: string }
  ) {
    this.dialRef = dialogRef;
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
