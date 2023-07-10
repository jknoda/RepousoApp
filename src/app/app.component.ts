/* import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {}
}
 */

import { NavigationEnd, Router } from '@angular/router';
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/folder', icon: 'home' },
    { title: 'Campeonato', url: '/campeonato', icon: 'people' },
    { title: 'Alterar nome e senha', url: '/altersenha', icon: 'trail-sign' },
    { title: 'Sair', url: '/', icon: 'exit' },
   
  ];

  url!: string;
  constructor(private router: Router) {
    
    router.events.subscribe(event => {

      if (event instanceof NavigationEnd ) {
        this.url = event.url; 
        console.log(this.url);
      }
    });
  }
}
