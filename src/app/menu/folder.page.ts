import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceConfig } from '../_config/services.config'

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit, DoCheck {
 
  nome: any;
  versao: string = ServiceConfig.VERSION;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router:Router, 
    ) { }

  ngOnInit() {
  }

  ngDoCheck(){
    this.nome = localStorage.getItem("userNome");
  }

  logout(){
    this.router.navigate(['/login']);
  }

  campeonato(){
    this.router.navigate(['/campeonato']);
  }

  alterarsenha(){
    this.router.navigate(['/altersenha']);
  }

}
