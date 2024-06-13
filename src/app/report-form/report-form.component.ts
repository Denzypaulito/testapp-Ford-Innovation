import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})
export class ReportFormComponent {
  @Input() engineNumber!: string; /* Necesito revisar esto*/
  @Input() rackNumber!: string; /* Necesito revisar esto*/

  report = {
    engineNumber: '',
    rackNumber: '',
    locationNumber: '',
    shipmentDate: ''
  };

  ngOnInit() {
    this.report.engineNumber = this.engineNumber;
    this.report.rackNumber = this.rackNumber;
  }

  onSubmit() {
    // Aquí se debería manejar la lógica para crear un reporte
    console.log('Reporte creado:', this.report);
  }
}
