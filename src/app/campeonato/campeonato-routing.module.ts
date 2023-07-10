import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CampeonatoPage } from './campeonato.page';
import { AuthGuard } from '../login/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: CampeonatoPage
  },
  {
    path: 'add-campeonato',
    loadChildren: () => import('./add-campeonato/add-campeonato.module').then( m => m.AddCampeonatoPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'add-campeonato/:EmpIdf/:TreIdf/:TreTitulo/:TreObs/:TreData/:TreResponsavel',
    loadChildren: () => import('./add-campeonato/add-campeonato.module').then( m => m.AddCampeonatoPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'histor-campeonato/:EmpIdf/:TreIdf/:TreCamIdf/:TreTitulo/:TreData',
    loadChildren: () => import('./histor-campeonato/histor-campeonato.module').then( m => m.HistorCampeonatoPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'cab-campeonato/:EmpIdf/:TreIdf/:TreTitulo/:TreData',
    loadChildren: () => import('./cab-campeonato/cab-campeonato.module').then( m => m.CabCampeonatoPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'selhistor-campeonato/:EmpIdf/:TreIdf/:TreTitulo/:TreData',
    loadChildren: () => import('./selhistor-campeonato/selhistor-campeonato.module').then( m => m.SelhistorCampeonatoPageModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CampeonatoPageRoutingModule {}
