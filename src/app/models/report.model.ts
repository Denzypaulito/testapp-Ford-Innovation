export class Report {
  engines: string[];
  rackNumber: string;
  shipmentDate: Date; 
  row : Number;
  pile : Number;
  positionPile : string;
  inTransit: boolean;
  siteName: string;

  constructor() {
    this.engines = [];
    this.rackNumber = "";
    this.shipmentDate = new Date();
    this.row = 0;
    this.pile = 0;
    this.positionPile = "";
    this.inTransit = false;
    this.siteName = "";
  }

}