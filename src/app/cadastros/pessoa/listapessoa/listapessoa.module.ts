import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListapessoaPageRoutingModule } from './listapessoa-routing.module';

import { ListapessoaPage } from './listapessoa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListapessoaPageRoutingModule
  ],
  declarations: [ListapessoaPage]
})
export class ListapessoaPageModule {}
