import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CabCampeonatoPage } from './cab-campeonato.page';

const routes: Routes = [
  {
    path: '',
    component: CabCampeonatoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CabCampeonatoPageRoutingModule {}
