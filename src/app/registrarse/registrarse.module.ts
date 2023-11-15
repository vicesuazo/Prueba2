import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { RegistrarsePageRoutingModule } from './registrarse-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { RegistrarsePage } from './registrarse.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HttpClientModule,
    RegistrarsePageRoutingModule
  ],
  declarations: [RegistrarsePage]
})
export class RegistrarsePageModule {}

