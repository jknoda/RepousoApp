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
      return true;
    }
    else
    {
      this.router.navigate(['denied']);
    }
    return true;
  }  
}
