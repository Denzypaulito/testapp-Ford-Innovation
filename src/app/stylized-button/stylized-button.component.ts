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

  buttonColor: string = '#008000'; // Default color is green (#008000)

  @Output() clickedEvt = new EventEmitter<string>();

  constructor(private dialog: MatDialog, private dataService: DataService) { }

  ngOnInit() {
    if (this.action === 'view' && this.ubicacion_id) {
      this.dataService.getDataByUbicacion(this.ubicacion_id).subscribe(data => {
        this.buttonColor = this.calculateButtonColor(data);
      });
    }
  }

  calculateButtonColor(reports: Report[]): string {
    let hasRed = false;
    let hasYellow = false;
    for (let report of reports) {
      const shipmentDate = new Date(report.shipmentDate);
      const currentDate = new Date();
      const differenceInDays = Math.floor((currentDate.getTime() - shipmentDate.getTime()) / (1000 * 60 * 60 * 24));

      if (differenceInDays > 60) {
        hasRed = true;
      } else if (differenceInDays > 30) {
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
