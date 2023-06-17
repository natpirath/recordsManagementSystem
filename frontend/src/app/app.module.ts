import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './controllers/record.controller';
import { FormsModule } from '@angular/forms';
import { RecordFilterComponent } from './controllers/record-filter.component';

/**
 * AppModule is the root module of the application that orchestrates the different components, modules, and services.
 */
@NgModule({
  declarations: [
    AppComponent,
    RecordFilterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
