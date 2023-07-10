import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Api } from 'src/services/api';
import { ServiceConfig } from '../../_config/services.config'

@Component({
  selector: 'app-cab-campeonato',
  templateUrl: './cab-campeonato.page.html',
  styleUrls: ['./cab-campeonato.page.scss'],
})
export class CabCampeonatoPage implements OnInit, OnDestroy {
  EmpIdf: number = ServiceConfig.EMPIDF;
  
  UsuIdf: string = localStorage.getItem("usuIdf")!;
  nome: string = localStorage.getItem("userNome")!;
  TreData: Date = new Date();
  TreIdf: number = 0;
  TreTitulo: string = "";
  faixaStr: string;

  modo: string = "ADD";

  TreCampCab: campeonatocabModel = {
    EmpIdf: 0,
    TreIdf: 0,
    UsuIdf: 0,
    FaixaIdf: 0,
    TreCamClasse: '',
    TreCamPeso: '',
    TreCamObs: '',
    TreCamClassificacao: '00'
  }
  
  spinner: boolean = false;

  buscarDados: Subscription | undefined;
  alterarDados: Subscription | undefined;

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
    this.carregar();
  }

  campeonatos(){
    this.router.navigate(['campeonato']);
  }

  carregar(){
    this.UsuIdf = localStorage.getItem("usuIdf")!;
    let dados = {
      EmpIdf: this.EmpIdf,
      TreIdf: this.TreIdf,
      UsuIdf: this.UsuIdf
    };
    this.spinner = true;
    this.buscarDados = this.provider.dadosApi(dados, "/api/treinocampcabecalho/find").subscribe({
      next: (data) => {
        if (data){
          this.TreCampCab.EmpIdf = data["EmpIdf"];
          this.TreCampCab.TreIdf = data["TreIdf"];
          this.TreCampCab.UsuIdf = data["UsuIdf"];
          this.TreCampCab.FaixaIdf = data["FaixaIdf"];
          this.TreCampCab.TreCamClasse = data["TreCamClasse"];
          this.TreCampCab.TreCamPeso = data["TreCamPeso"];
          this.TreCampCab.TreCamObs = data["TreCamObs"];
          this.TreCampCab.TreCamClassificacao = data["TreCamClassificacao"];
          this.faixaStr = this.TreCampCab.FaixaIdf.toString();

          this.modo = "UPD";
        } 
        else {
          this.modo = "ADD";
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

  salvar(){
    this.UsuIdf = localStorage.getItem("usuIdf")!;
    let api = "/api/treinocampcabecalho/create";
    let msg = "Dados incluidos com sucesso!";
    if (this.modo == "UPD"){
      api = "/api/treinocampcabecalho/update";
      msg = "Dados alterados com sucesso!";
    }
    if (this.TreTitulo == ""){
      this.mensagem('Digite o título!', 'danger');
    }
    else{
      let dados = {
        EmpIdf: this.EmpIdf,
        TreIdf: this.TreIdf,
        UsuIdf: this.UsuIdf,
        FaixaIdf: parseInt(this.faixaStr),
        TreCamClasse: this.TreCampCab.TreCamClasse,
        TreCamPeso: this.TreCampCab.TreCamPeso,
        TreCamObs: this.TreCampCab.TreCamObs,
        TreCamClassificacao: this.TreCampCab.TreCamClassificacao
      }
      this.spinner = true;
      this.alterarDados = this.provider.dadosApi(dados, api).subscribe({
        next: (data) => {
          this.spinner = false;
          if(data['TreIdf'] != 0){
            this.router.navigate(['campeonato']);
            this.mensagem(msg, 'success');
          }else{
            this.mensagem('Erro ao incluir dados!', 'danger');
          }
          this.modo = "UPD";
          this.proxima();
        },
        error: (err) => {
          this.spinner = false;
          let msg = err.error.msg.toString();
          this.mensagem(msg,"danger");
        }
      });      
    }
  }

  proxima(){
    this.router.navigate(['selhistor-campeonato/' + 
      this.EmpIdf + '/' + 
      this.TreIdf + '/' + 
      this.TreTitulo + '/' +
      this.TreData + '/' 
    ])
  }

  ngOnDestroy(): void {
    if (this.buscarDados != null){
      this.buscarDados.unsubscribe();
    }
    if (this.alterarDados != null){
      this.alterarDados.unsubscribe();
    }
  }
}
export class campeonatocabModel {
  public EmpIdf: number;
  public TreIdf: number;
  public UsuIdf: number;
  public FaixaIdf: number;
  public TreCamClasse: string;
  public TreCamPeso: string;
  public TreCamObs: string;
  public TreCamClassificacao: string;
}