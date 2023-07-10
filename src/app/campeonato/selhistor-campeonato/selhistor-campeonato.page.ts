import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Api } from 'src/services/api';
import { ServiceConfig } from '../../_config/services.config'

@Component({
  selector: 'app-selhistor-campeonato',
  templateUrl: './selhistor-campeonato.page.html',
  styleUrls: ['./selhistor-campeonato.page.scss'],
})
export class SelhistorCampeonatoPage implements OnInit, OnDestroy {
  itens : any = [];

  EmpIdf: number = ServiceConfig.EMPIDF;
  TreIdf: number = 0;
  TreTipo: string = "C";
  TreData: Date = new Date();
  TreTitulo: string = "";
  TreObs: string = "";
  TreResponsavel: string = "";
  UsuIdf: string = localStorage.getItem("usuIdf")!;
  nome: string = localStorage.getItem("userNome")!;
  resultado: string[];

  spinner: boolean = false;

  buscarDados: Subscription | undefined;
  excluirDados: Subscription | undefined;

  constructor(
    private router:Router, 
    private provider:Api,
    private actRouter:ActivatedRoute,
    public toastController: ToastController,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.actRouter.params.subscribe((data:any)=>{
      this.EmpIdf = data.EmpIdf;
      this.TreIdf = data.TreIdf;
      this.TreTitulo = data.TreTitulo;
      this.TreData = new Date(data.TreData);
    })        
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

  ionViewWillEnter(){
    this.itens = [];
    this.carregar();
  }

  campeonatos(){
    this.router.navigate(['campeonato']);
  }

  carregar(){
    this.itens = [];
    let dados = {
      EmpIdf: this.EmpIdf,
      TreIdf: this.TreIdf,
      UsuIdf: this.UsuIdf
    };
    this.spinner = true;
    this.buscarDados = this.provider.dadosApi(dados, "/api/treinocampeonato/findalluser").subscribe({
      next: (data) => {
        this.itens = [];
        let ok = true;
        let item = 0;
        while( ok ){
          if (data[item] != null){
            let resultado = data[item]["TreCamVitoria"] ? "VENCEU" : "PERDEU";
            this.itens.push(
              {
                ...data[item],
                "resultado":resultado
              }
            );
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

  async showExcluir(EmpIdf, TreIdf, TreCamIdf) {  
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Atenção!',
      message: 'Exclui este histórico?',
      buttons: [
        {
          text: 'Não',
          cssClass: 'secondary',
        },
        {
          text: 'Sim',
          handler: () => {
            this.excluir(EmpIdf, TreIdf, TreCamIdf);
          },
        },
      ],
    });
    await alert.present();
  }  

  excluir(EmpIdf, TreIdf, TreCamIdf){   
    let dados = {
      EmpIdf: EmpIdf,
      TreIdf: TreIdf,
      TreCamIdf: TreCamIdf
    }
    this.spinner = true;
    this.excluirDados = this.provider.dadosApi(dados, "/api/treinocampeonato/delete").subscribe({
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

  editar(EmpIdf, TreIdf, TreCamIdf){
    this.router.navigate(['histor-campeonato/' + 
      EmpIdf + '/' + 
      TreIdf + '/' + 
      TreCamIdf + '/' +
      this.TreTitulo + '/' +
      this.TreData + '/'
    ])
  }

  addHistor(){
      this.router.navigate(['histor-campeonato/' + 
      this.EmpIdf + '/' + 
      this.TreIdf + '/' + 
      '0/' +
      this.TreTitulo + '/' +
      this.TreData + '/'
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
