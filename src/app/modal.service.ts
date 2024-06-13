import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ReportModalComponent } from './report-modal/report-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private dialogRef: MatDialogRef<ReportModalComponent> | null = null;

  constructor(private dialog: MatDialog) { }

  openReportModal(engineNumber: string, rackNumber: string): void {
    // Cerrar el modal actual si está abierto
    this.closeModal();

    // Abrir un nuevo modal
    this.dialogRef = this.dialog.open(ReportModalComponent, {
      width: '600px',
      data: { engineNumber, rackNumber }
    });

    // Manejar el cierre del modal
    this.dialogRef.afterClosed().subscribe(() => {
      this.dialogRef = null;
    });
  }

  closeModal(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
      this.dialogRef = null;
    }
  }
}
