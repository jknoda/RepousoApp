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
import { SafeResourceUrl } from '@angular/platform-browser';
import { ThisReceiver } from '@angular/compiler';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appPages = [
    { title: 'Home', url: '/folder', icon: 'home', show: true },
    { title: 'Sair', url: '/', icon: 'exit', show: true },
  ];

  url!: string;
  show: boolean = true;
  empresa: string = "CASA REPOUSO";

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd ) {
        this.empresa = localStorage.getItem("empFantasia")!;
        if (!this.empresa){
          this.empresa = "";
        }
        if (this.empresa.length > 50){
          this.empresa = this.empresa.substring(0,49);
        }
        let perfil = localStorage.getItem("userPerfil");
        this.appPages = [
          { title: 'Home', url: '/folder', icon: 'fa-sharp fa-solid fa-house', show: true },
          { title: 'Empresa', url: '/empresa', icon: 'fa-sharp fa-solid fa-building', show: (perfil == 'M') },
          { title: 'Pessoa', url: '/listapessoa', icon: 'fa-sharp fa-solid fa-person', show: (perfil == 'A' || perfil == 'M') },
          { title: 'Alterar nome e senha', url: '/altersenha', icon: 'fa-sharp fa-solid fa-key', show: true },
          { title: 'Sair', url: '/', icon: 'fa-sharp fa-solid fa-right-from-bracket', show: true },
        ];
        this.url = event.url.toUpperCase();

        this.show = this.url != '/LOGIN';
        this.show = this.show && (this.url.indexOf('/PESSOA') == -1);


        //console.log('Show url',this.url, this.url.indexOf('/PESSOA'), this.show);

      }
    });
  }
}
