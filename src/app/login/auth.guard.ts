import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
  CanActivate
} from '@angular/router';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';
import { Api } from 'src/services/api';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> 
  {
    if (localStorage.getItem("userLogado") == "S"){
      return this.checarRota(route);
    }
    else
    {
      this.router.navigate(['denied']);
    }
    return true;
  }  

  private checarRota(route: ActivatedRouteSnapshot){
    let rolesRota = '';
    let roles = '';
    if (typeof route.data['roles'] !== 'undefined' && route.data['roles']){
      rolesRota = route.data['roles'];
      const perfil = localStorage.getItem('userPerfil');
      switch(perfil){
        case 'M' : roles = 'MAS';
          break;
        case 'A' : roles = 'ADM';
          break;
        case 'T' : roles = 'TEC';
          break;
        case 'X' : roles = 'AUX';
          break;
        default: roles = 'USU';
          break;
      }
      if (rolesRota != roles && roles != 'MAS')
      {        
        this.router.navigate(['denied']);
      }
    }
    return true;
  }
}
