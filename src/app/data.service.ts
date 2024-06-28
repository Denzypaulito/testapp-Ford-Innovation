import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from './models/report.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getData(): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.baseUrl}/reports`);
  }

  saveReport(report: Report): Observable<any> {
    return this.http.post(`${this.baseUrl}/reports`, report);
  }

  updateRackLocation(rackNumber: string, location: string): Observable<any> {
    const updateData = { locationNumber: location };
    return this.http.patch(`${this.baseUrl}/reports/${rackNumber}`, updateData);
  }

  getDataByUbicacion(ubicacionId: string): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.baseUrl}/reports?ubicacionId=${ubicacionId}`);
  }
}
