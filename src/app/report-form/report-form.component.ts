import { Component, Input } from '@angular/core';
import { DataService } from '../data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateReportModalComponent } from '../create-report-modal/create-report-modal.component';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})
export class ReportFormComponent {
  report = {
    motor: '',
    rack: '',
    ubicacion: '',
    fechaEmbarque: ''
  };

  @Input() dialogRef?: MatDialogRef<CreateReportModalComponent>;

  constructor(private dataService: DataService) { }

  onSubmit() {
    this.dataService.createData(this.report).subscribe(response => {
      console.log('Reporte creado:', response);
      if(this.dialogRef) this.dialogRef.close();
    }, error => {
      console.error('Error al crear el reporte:', error);
    });
  }
}
