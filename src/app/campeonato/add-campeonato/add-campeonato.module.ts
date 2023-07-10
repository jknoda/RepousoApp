import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCampeonatoPageRoutingModule } from './add-campeonato-routing.module';

import { AddCampeonatoPage } from './add-campeonato.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddCampeonatoPageRoutingModule
  ],
  declarations: [AddCampeonatoPage]
})
export class AddCampeonatoPageModule {}
