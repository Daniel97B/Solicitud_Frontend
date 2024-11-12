import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministradorRoutingModule } from './administrador-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AdministradorComponent } from './administrador.component';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';


@NgModule({
  declarations: [
    AdministradorComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    AdministradorRoutingModule,
    HttpClientModule,
    ReactiveFormsModule 
  ]
})
export class AdministradorModule { }
