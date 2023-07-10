import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeniedPageRoutingModule } from './denied-routing.module';

import { DeniedPage } from './denied.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeniedPageRoutingModule
  ],
  declarations: [DeniedPage]
})
export class DeniedPageModule {}
