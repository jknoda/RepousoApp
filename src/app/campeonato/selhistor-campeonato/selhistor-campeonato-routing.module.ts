import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelhistorCampeonatoPage } from './selhistor-campeonato.page';

const routes: Routes = [
  {
    path: '',
    component: SelhistorCampeonatoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelhistorCampeonatoPageRoutingModule {}
