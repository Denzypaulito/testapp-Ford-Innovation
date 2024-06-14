import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'testapp';

  numeros = ['1', '2', '3', '4', '5', '6'];
  searchQuery: string = '';
  highlightedRack: string | null = null;

  constructor(private dataService: DataService) { }

  searchRack() {
    this.highlightedRack = null; // Reset highlighted rack
    this.dataService.getData().subscribe(data => {
      for (let rack of this.numeros) {
        const racksData = data.filter((item: any) => item.ubicacion === rack);
        const found = racksData.some((item: any) => item.rack === this.searchQuery);
        if (found) {
          this.highlightedRack = rack;
          break;
        }
      }
    });
  }
}
