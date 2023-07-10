import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorCampeonatoPageRoutingModule } from './histor-campeonato-routing.module';

import { HistorCampeonatoPage } from './histor-campeonato.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorCampeonatoPageRoutingModule
  ],
  declarations: [HistorCampeonatoPage]
})
export class HistorCampeonatoPageModule {}
