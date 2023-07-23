import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { ServiceConfig } from '../_config/services.config'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Api } from 'src/services/api';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit, DoCheck, OnDestroy {
 
  nome: any;
  versao: string = ServiceConfig.VERSION;
  master: boolean = false;
  logoempresa: SafeResourceUrl;
  logoOk: boolean = false;

  buscarDados: Subscription | undefined;
  
  constructor(
    private router:Router, 
    private provider:Api,
    private sanitizer:DomSanitizer
  ) { }

  ngOnInit() {    
  }
 
  ionViewWillEnter() {
    //this.buscalogo();
    let empLogo = JSON.parse(localStorage.getItem("empLogo")!);
    let imagem = this.bin2String(empLogo);
    this.logoempresa = this.sanitizer.bypassSecurityTrustUrl(imagem);
    this.logoOk = true;
  }

  ngDoCheck(){    
    this.master = localStorage.getItem("userPerfil") == "M";
    this.nome = localStorage.getItem("userNome");
  }

  logout(){
    this.router.navigate(['/login']);
  }
  teste(){
    this.router.navigate(['/teste']);
  }
  empresa(){
    this.router.navigate(['/empresa']);
  }

  campeonato(){
    this.router.navigate(['/campeonato']);
  }

  alterarsenha(){
    this.router.navigate(['/altersenha']);
  }

  /*
  private buscalogo(){
    let dados = {
      empidf: ServiceConfig.EMPIDF
    };
    this.logoOk = false;
    this.buscarDados = this.provider.dadosApi(dados, "/api/empresa/empresalogo").subscribe({
      next: (data) => {
        if (data.emplogo){
          let imagem = this.bin2String(data.emplogo["data"]);
          this.logoempresa = this.sanitizer.bypassSecurityTrustUrl(imagem);
          this.logoOk = true;
        }
      },
      error: (err) => {
        let msg = err.error.msg.toString();
      }
    });
  }
  */
  bin2String(array) {
    var retorno = '';
    //var j = 0;
    for(let j=0;j<array.length;j++){
      retorno = retorno + String.fromCharCode(array[j])
    }
    return retorno;
  }

  ngOnDestroy(): void {
    if (this.buscarDados != null){
      this.buscarDados.unsubscribe();
    }
  }

}
