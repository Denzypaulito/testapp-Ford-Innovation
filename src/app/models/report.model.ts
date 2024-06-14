export class Report {
    engineNumber: string;
    rackNumber: string;
    locationNumber: string;
    shipmentDate: Date; 

    constructor() {
      this.engineNumber = "";
      this.rackNumber = "";
      this.locationNumber = "";
      this.shipmentDate = new Date();
    }

  }
  