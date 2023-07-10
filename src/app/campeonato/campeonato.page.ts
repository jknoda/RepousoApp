import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Api } from 'src/services/api';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ServiceConfig } from '../_config/services.config'

@Component({
  selector: 'app-campeonato',
  templateUrl: './campeonato.page.html',
  styleUrls: ['./campeonato.page.scss'],
})
export class CampeonatoPage implements OnInit, DoCheck, OnDestroy {
  itens : any = [];
  filtro : string = "";
  spinner: boolean = false;

  EmpIdf : number = ServiceConfig.EMPIDF;
  UsuPerfil: string;

  buscarDados: Subscription | undefined;
  excluirDados: Subscription | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router:Router, 
    private provider:Api,
    public toastController: ToastController,
    public alertController: AlertController
   ) { }

  ngOnInit() {    
  }

  ngDoCheck(){
    this.UsuPerfil = localStorage.getItem("userPerfil")!;
  }

  ionViewWillEnter(){
    this.itens = [];
    this.carregar();
  }

  async mensagem(mensagem, cor){
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000,
      color: cor,
      position: 'top'
    });
    toast.present();
  }

  carregar(){
    this.itens = [];
    let dados = {
      EmpIdf: this.EmpIdf,
      TreTipo: 'C',
      TreTitulo: this.filtro
    };
    this.spinner = true;
    this.buscarDados = this.provider.dadosApi(dados, "/api/treino/findalltipo").subscribe({
      next: (data) => {
        this.itens = [];
        let ok = true;
        let item = 0;
        while( ok ){
          if (data[item] != null){
            this.itens.push(data[item]);
            item += 1;
          }
          else {
            ok = false;
          }
        }         
        this.spinner = false; 
      },
      error: (err) => {
        this.spinner = false;
        let msg = err.error.msg.toString();
        this.mensagem(msg,"danger");
      }
    });
  }

  addCampeonato() {
    this.router.navigate(['add-campeonato']);
  }

  async showExcluir(TreIdf) {  
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Atenção!',
      message: 'Exclui este campeonato?',
      buttons: [
        {
          text: 'Não',
          cssClass: 'secondary',
        },
        {
          text: 'Sim',
          handler: () => {
            this.excluir(TreIdf);
          },
        },
      ],
    });
    await alert.present();
  }  

  excluir(TreIdf){   
    let dados = {
      EmpIdf: this.EmpIdf,
      TreIdf: TreIdf
    }
    this.spinner = true;
    this.excluirDados = this.provider.dadosApi(dados, "/api/treino/delete").subscribe({
      next: (data) => {
        if(data == 1){
          this.spinner = false;
          this.carregar();
          this.mensagem('Excluido com sucesso!', 'success');
        }else{
          this.mensagem('Erro ao excluir!', 'danger');
        }          
      },
      error: (err) => {
        this.spinner = false;
        let msg = err.error.msg.toString();
        this.mensagem(msg,"danger");
      }
    });
  }

  editar(EmpIdf, TreIdf, TreTitulo, TreObs, TreData, TreResponsavel){
    if (TreObs == "") {
      TreObs = "-";
    }
    this.router.navigate(['add-campeonato/' + 
      EmpIdf + '/' + 
      TreIdf + '/' + 
      TreTitulo.replace('/','-') + '/' +
      TreObs.replace('/','-') + '/' +
      TreData + '/' +
      TreResponsavel.replace('/','-') + '/' 
    ])
  }

  selecionar(EmpIdf, TreIdf, TreTitulo, TreObs, TreData, TreResponsavel){
    this.router.navigate(['cab-campeonato/' + 
      EmpIdf + '/' + 
      TreIdf + '/' + 
      TreTitulo + '/' +
      TreData + '/' 
    ])
  }

  //atualizar o list view
  doRefresh(event) {
    setTimeout(() => {
      this.ionViewWillEnter();
      event.target.complete();
    }, 500);
  }

  ngOnDestroy(): void {
    if (this.buscarDados != null){
      this.buscarDados.unsubscribe();
    }
    if (this.excluirDados != null){
      this.excluirDados.unsubscribe();
    }
  }
}
