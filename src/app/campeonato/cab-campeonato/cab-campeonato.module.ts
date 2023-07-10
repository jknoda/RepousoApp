import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CabCampeonatoPageRoutingModule } from './cab-campeonato-routing.module';

import { CabCampeonatoPage } from './cab-campeonato.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CabCampeonatoPageRoutingModule
  ],
  declarations: [CabCampeonatoPage]
})
export class CabCampeonatoPageModule {}
