import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelhistorCampeonatoPageRoutingModule } from './selhistor-campeonato-routing.module';

import { SelhistorCampeonatoPage } from './selhistor-campeonato.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelhistorCampeonatoPageRoutingModule
  ],
  declarations: [SelhistorCampeonatoPage]
})
export class SelhistorCampeonatoPageModule {}
