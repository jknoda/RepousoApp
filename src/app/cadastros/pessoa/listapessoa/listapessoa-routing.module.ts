import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListapessoaPage } from './listapessoa.page';
import { AuthGuard } from 'src/app/login/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ListapessoaPage
  },
  {
    path: 'edit-pessoa/:pessoaidf',
    loadChildren: () => import('../cadastropessoa/pessoa.module').then( m => m.PessoaPageModule),
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListapessoaPageRoutingModule {}
