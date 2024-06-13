import { Component } from '@angular/core';
import { DataService } from '../data.service';

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

  constructor(private dataService: DataService) { }

  onSubmit() {
    this.dataService.createData(this.report).subscribe(response => {
      console.log('Reporte creado:', response);
    }, error => {
      console.error('Error al crear el reporte:', error);
    });
  }
}
