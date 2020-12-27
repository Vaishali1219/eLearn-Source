import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { AppRoutingModule } from '../../app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  exports: [
    MDBBootstrapModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class SharedModule { }
