import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorCampeonatoPage } from './histor-campeonato.page';

const routes: Routes = [
  {
    path: '',
    component: HistorCampeonatoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorCampeonatoPageRoutingModule {}
