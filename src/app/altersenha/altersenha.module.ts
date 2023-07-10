import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AltersenhaPageRoutingModule } from './altersenha-routing.module';

import { AltersenhaPage } from './altersenha.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AltersenhaPageRoutingModule
  ],
  declarations: [AltersenhaPage]
})
export class AltersenhaPageModule {}
