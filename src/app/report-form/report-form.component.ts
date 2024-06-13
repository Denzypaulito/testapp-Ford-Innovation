import { Component } from '@angular/core';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})
export class ReportFormComponent {
  report = {
    engineNumber: '',
    rackNumber: '',
    locationNumber: '',
    shipmentDate: ''
  };

  onSubmit() {
    // Aquí se debería manejar la lógica para crear un reporte
    console.log('Reporte creado:', this.report);
  }
}
