import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {Observable } from "rxjs/Rx";
// import 'rxjs/add/operator/toPromise';
import 'rxjs';

import { InputTextModule, DataTableModule, ButtonModule, DialogModule,TooltipModule,ConfirmDialogModule,ConfirmationService,
  GrowlModule, DropdownModule } from 'primeng/primeng';
import { AppComponent } from './app.component';
import {TOWCodeMappingService} from './service/TOWCodeMappingService'

@NgModule({
  declarations: [
    AppComponent        
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    InputTextModule, 
    DataTableModule, 
    ButtonModule, 
    DialogModule,
    TooltipModule,
    ConfirmDialogModule,
    GrowlModule,
    DropdownModule
  ],
  providers: [TOWCodeMappingService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
