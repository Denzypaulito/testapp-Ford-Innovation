import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { Report } from '../models/report.model';

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

  buttonColor: string = '#9b9b9b'; // Default color is gray (#9b9b9b)

  @Output() clickedEvt = new EventEmitter<string>();

  constructor(private dialog: MatDialog, private dataService: DataService) { }

  ngOnInit() {
    if (this.action === 'view' && this.ubicacion_id) {
      this.dataService.getDataByUbicacion(this.ubicacion_id).subscribe((data: Report[]) => {
        this.buttonColor = this.calculateButtonColor(data);
      });
    }
  }

  calculateButtonColor(reports: Report[]): string {
    if (reports.length === 0) {
      return '#9b9b9b'; // Gray if there are no reports
    }

    let hasRed = false;
    let hasYellow = false;
    for (let report of reports) {
      const shipmentDate = new Date(report.shipmentDate);
      const currentDate = new Date();
      const differenceInDays = Math.floor((currentDate.getTime() - shipmentDate.getTime()) / (1000 * 60 * 60 * 24));

      if (differenceInDays > 14) {
        hasRed = true;
      } else if (differenceInDays > 7) {
        hasYellow = true;
      }

      if (hasRed) return '#FF0000'; // Red (#FF0000)
    }

    return hasYellow ? '#fad201' : '#008000'; // Yellow (#FFFF00) or Green (#008000)
  }

  openModal() {
    this.clickedEvt.emit(this.ubicacion_id);
  }
}
