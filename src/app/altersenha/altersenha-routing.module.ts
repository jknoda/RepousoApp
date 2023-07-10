import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AltersenhaPage } from './altersenha.page';

const routes: Routes = [
  {
    path: '',
    component: AltersenhaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AltersenhaPageRoutingModule {}
