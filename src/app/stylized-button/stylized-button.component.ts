import { Component, Input } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-stylized-button',
  templateUrl: './stylized-button.component.html',
  styleUrls: ['./stylized-button.component.css']
})
export class StylizedButtonComponent {
  @Input() engineNumber: string = '';
  @Input() rackNumber: string = '';
  @Input() buttonName: string = 'Click Me';

  constructor(private modalService: ModalService) { }

  openReportModal() {
    this.modalService.openReportModal(this.engineNumber, this.rackNumber);
  }
}
