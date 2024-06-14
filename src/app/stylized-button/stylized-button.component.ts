import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReportModalComponent } from '../report-modal/report-modal.component';
import { CreateReportModalComponent } from '../create-report-modal/create-report-modal.component';
import { DataService } from '../data.service';

@Component({
  selector: 'app-stylized-button',
  templateUrl: './stylized-button.component.html',
  styleUrls: ['./stylized-button.component.css']
})
export class StylizedButtonComponent implements OnInit {
  @Input() buttonName: string = 'Click Me';
  @Input() action: 'create' | 'view' = 'view';
  @Input() ubicacion_id: string = '';
  @Input() highlight: boolean = false;

  buttonColor: string = '#008000'; // Default color is green (#008000)

  constructor(private dialog: MatDialog, private dataService: DataService) { }

  ngOnInit() {
    if (this.action === 'view' && this.ubicacion_id) {
      this.dataService.getDataByUbicacion(this.ubicacion_id).subscribe(data => {
        this.buttonColor = this.calculateButtonColor(data);
      });
    }
  }

  calculateButtonColor(reports: any[]): string {
    let hasRed = false;
    let hasYellow = false;
    for (let report of reports) {
      const shipmentDate = new Date(report.fechaEmbarque);
      const currentDate = new Date();
      const differenceInDays = Math.floor((currentDate.getTime() - shipmentDate.getTime()) / (1000 * 60 * 60 * 24));

      if (differenceInDays > 60) {
        hasRed = true;
      } else if (differenceInDays > 30) {
        hasYellow = true;
      }

      if (hasRed) return '#FF0000'; // Red (#FF0000)
    }

    return hasYellow ? '#FFDF00' : '#008000'; // Yellow (#FFFF00) or Green (#008000)
  }

  openModal() {
    if (this.action === 'create') {
      this.dialog.open(CreateReportModalComponent, {
        width: '600px',
        data: { buttonName: this.buttonName }
      });
    } else {
      let dref = this.dialog.open(ReportModalComponent, {
        width: '600px',
        data: { buttonName: this.buttonName }
      });
      dref.componentInstance.ubicacion_id = this.ubicacion_id;
    }
  }
}
