import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportWindowComponent } from './report-window/report-window.component';

const routes: Routes = [
  { path: 'report', component: ReportWindowComponent }
  //{ path: '', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
