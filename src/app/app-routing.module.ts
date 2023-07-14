import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './login/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder',
    loadChildren: () => import('./menu/folder.module').then( m => m.FolderPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },   {
    path: 'denied',
    loadChildren: () => import('./denied/denied.module').then( m => m.DeniedPageModule)
  },
  {
    path: 'altersenha',
    loadChildren: () => import('./altersenha/altersenha.module').then( m => m.AltersenhaPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'empresa',
    loadChildren: () => import('./empresa/empresa.module').then( m => m.EmpresaPageModule),
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
