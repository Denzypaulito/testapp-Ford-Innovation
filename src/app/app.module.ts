import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StylizedButtonComponent } from './stylized-button/stylized-button.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    StylizedButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
