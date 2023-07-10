import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeniedPage } from './denied.page';

const routes: Routes = [
  {
    path: '',
    component: DeniedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeniedPageRoutingModule {}
