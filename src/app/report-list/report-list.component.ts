import { Component } from '@angular/core';
import { Report } from './report.model';  

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent {
  reports: Report[] = [
    // Puedes añadir algunos reportes de prueba aquí para ver cómo funciona
    { engineNumber: '1234', rackNumber: 'A1', locationNumber: 'L1', shipmentDate: '2023-04-01' },
    { engineNumber: '5678', rackNumber: 'B2', locationNumber: 'L2', shipmentDate: '2023-05-01' },
    { engineNumber: '9101', rackNumber: 'C3', locationNumber: 'L3', shipmentDate: '2023-06-01' }
  ];

  searchReports() {
    // Lógica para buscar reportes
  }

  viewReports() {
    // Lógica para ver reportes
  }

  getShipmentClass(shipmentDate: string): string {
    const currentDate = new Date();
    const shipment = new Date(shipmentDate);
    const differenceInDays = Math.floor((currentDate.getTime() - shipment.getTime()) / (1000 * 60 * 60 * 24));

    if (differenceInDays > 60) {
      return 'red';
    } else if (differenceInDays > 30) {
      return 'yellow';
    } else {
      return 'green';
    }
  }
}
