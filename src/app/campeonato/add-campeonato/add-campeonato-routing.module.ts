import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCampeonatoPage } from './add-campeonato.page';

const routes: Routes = [
  {
    path: '',
    component: AddCampeonatoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddCampeonatoPageRoutingModule {}
