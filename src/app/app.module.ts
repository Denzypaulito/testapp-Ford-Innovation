import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { StylizedButtonComponent } from './stylized-button/stylized-button.component';
import { ReportModalComponent } from './report-modal/report-modal.component';
import { ReportFormComponent } from './report-form/report-form.component';
import { ReportListComponent } from './report-list/report-list.component';
import { AppRoutingModule } from './app-routing.module';
import { ReportWindowComponent } from './report-window/report-window.component';
import { CreateReportModalComponent } from './create-report-modal/create-report-modal.component';
import { DataService } from './data.service';
import { StylizedButton2Component } from './stylized-button2/stylized-button2.component';

@NgModule({
  declarations: [
    AppComponent,
    StylizedButtonComponent,
    ReportModalComponent,
    ReportFormComponent,
    ReportListComponent,
    ReportWindowComponent,
    CreateReportModalComponent,
    StylizedButton2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
