import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Api } from 'src/services/api';
import { ServiceConfig } from '../../_config/services.config'

@Component({
  selector: 'app-histor-campeonato',
  templateUrl: './histor-campeonato.page.html',
  styleUrls: ['./histor-campeonato.page.scss'],
})
export class HistorCampeonatoPage implements OnInit, OnDestroy {
  EmpIdf: number = ServiceConfig.EMPIDF;
  TreIdf: number = 0;
  TreTipo: string = "C";
  TreData: Date = new Date();
  TreTitulo: string = "";
  TreObs: string = "";
  TreResponsavel: string = "";
  TreCamIdf: number = 0;
  UsuIdf: string = localStorage.getItem("usuIdf")!;

  faixaStr: string;

  advIppon: number = 0;
  advWazari: number  = 0;
  advShido: number  = 0;
  euIppon: number  = 0;
  euWazari: number  = 0;
  euShido: number  = 0;

  vitoria: string = "S";

  TreCampeonato: campeonatoModel = {
    EmpIdf: 0,
    TreIdf: 0,
    TreCamIdf: 0,
    AluIdf: 0,
    UsuIdf: 0,
    TreCamRound: '',
    TreCamAdvNome: '',
    TreCamAdvClube: '',
    TreCamPlacarFavor: '',
    TreCamPlacarContra: '',
    TreCamVitoria: false,
    TreCamObs: '',
    TreCamTecnico: '',
    TreCamOrdem: '',
    TreCamAdvFaixa: 0
  };
  

  modo: string = "ADD";

  spinner: boolean = false;

  buscarDados: Subscription;
  alterDados: Subscription;

  constructor(
    private router:Router, 
    private provider:Api,
    private actRouter:ActivatedRoute,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.actRouter.params.subscribe((data:any)=>{
      this.EmpIdf = data.EmpIdf;
      this.TreIdf = data.TreIdf;
      this.TreCamIdf = data.TreCamIdf;
      this.TreTitulo = data.TreTitulo;
      this.TreData = data.TreData;
    })    
    if (this.TreCamIdf == 0){
      this.modo = "ADD"
      this.limparDados();
    }
    else {
      this.modo = "UPD";
      this.carregar();
    }
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

  selHistor(){
      this.router.navigate(['selhistor-campeonato/' + 
      this.EmpIdf + '/' + 
      this.TreIdf + '/' + 
      this.TreTitulo + '/' +
      this.TreData + '/' 
    ])
  }

  carregar(){
    let dados = {
      EmpIdf: this.EmpIdf,
      TreIdf: this.TreIdf,
      TreCamIdf: this.TreCamIdf
    };
    this.spinner = true;
    this.buscarDados = this.provider.dadosApi(dados, "/api/treinocampeonato/find").subscribe({
      next: (data) => {
        this.TreCampeonato.EmpIdf	= data["EmpIdf"];
        this.TreCampeonato.TreIdf = data["TreIdf"];
        this.TreCampeonato.TreCamIdf = data["TreCamIdf"];
        this.TreCampeonato.AluIdf = data["AluIdf"];
        this.TreCampeonato.UsuIdf = data["UsuIdf"];
        this.TreCampeonato.TreCamRound = data["TreCamRound"];
        this.TreCampeonato.TreCamAdvNome = data["TreCamAdvNome"];
        this.TreCampeonato.TreCamAdvClube = data["TreCamAdvClube"];
        this.TreCampeonato.TreCamPlacarFavor = data["TreCamPlacarFavor"];
        this.TreCampeonato.TreCamPlacarContra = data["TreCamPlacarContra"];
        this.TreCampeonato.TreCamVitoria = data["TreCamVitoria"];
        this.TreCampeonato.TreCamObs = data["TreCamObs"];
        this.TreCampeonato.TreCamTecnico = data["TreCamTecnico"];
        this.TreCampeonato.TreCamOrdem = data["TreCamOrdem"];
        this.TreCampeonato.TreCamAdvFaixa = data["TreCamAdvFaixa"];
        this.faixaStr = this.TreCampeonato.TreCamAdvFaixa.toString();
        this.vitoria = this.TreCampeonato.TreCamVitoria ? "S" : "N";
        this.euIppon = parseInt(this.TreCampeonato.TreCamPlacarFavor.substring(0,1));
        this.euWazari = parseInt(this.TreCampeonato.TreCamPlacarFavor.substring(2,3));
        this.euShido = parseInt(this.TreCampeonato.TreCamPlacarFavor.substring(4,5));

        this.advIppon = parseInt(this.TreCampeonato.TreCamPlacarContra.substring(0,1));
        this.advWazari = parseInt(this.TreCampeonato.TreCamPlacarContra.substring(2,3));
        this.advShido = parseInt(this.TreCampeonato.TreCamPlacarContra.substring(4,5));

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
    let api = "/api/treinocampeonato/create";
    let msg = "Histórico incluido com sucesso!";
    if (this.modo == "UPD"){
      api = "/api/treinocampeonato/update";
      msg = "Histórico alterado com sucesso!";
    }
    if (this.TreCampeonato.TreCamRound == ""){
      this.mensagem('Selecione a rodada!', 'danger');
    }
    else{
      this.TreCampeonato.TreCamVitoria = this.vitoria == "S";
      this.TreCampeonato.TreCamPlacarFavor = this.euIppon.toString().trim()+"I"+
        this.euWazari.toString().trim()+"W"+
        this.euShido.toString().trim()+"S";
      this.TreCampeonato.TreCamPlacarContra = this.advIppon.toString().trim()+"I"+
        this.advWazari.toString().trim()+"W"+
        this.advShido.toString().trim()+"S";
      let dados = {
        EmpIdf: this.EmpIdf,
        TreIdf: this.TreIdf,
        TreCamIdf: this.TreCamIdf,
        UsuIdf: this.UsuIdf,
        //AluIdf: this.TreCampeonato.AluIdf,
        TreCamRound: this.TreCampeonato.TreCamRound,
        TreCamAdvNome: this.TreCampeonato.TreCamAdvNome,
        TreCamAdvClube: this.TreCampeonato.TreCamAdvClube,
        TreCamPlacarFavor: this.TreCampeonato.TreCamPlacarFavor,
        TreCamPlacarContra: this.TreCampeonato.TreCamPlacarContra,
        TreCamVitoria: this.TreCampeonato.TreCamVitoria,
        TreCamObs: this.TreCampeonato.TreCamObs,
        TreCamTecnico: this.TreCampeonato.TreCamTecnico,
        TreCamOrdem: this.TreCampeonato.TreCamOrdem,
        TreCamAdvFaixa: parseInt(this.faixaStr)
      }
      this.spinner = true;
      this.alterDados = this.provider.dadosApi(dados, api).subscribe({
        next: (data) => {
          this.spinner = false;
          if(data['TreCamIdf'] != 0){
            this.router.navigate(['selhistor-campeonato/' + 
              this.EmpIdf + '/' + 
              this.TreIdf + '/' + 
              this.TreTitulo + '/' +
              this.TreData + '/' 
            ])
            this.mensagem(msg, 'success');
            this.limparDados();
          }else{
            this.mensagem('Erro ao incluir campeonato!', 'danger');
          }
        },
        error: (err) => {
          this.spinner = false;
          let msg = err.error.msg.toString();
          this.mensagem(msg,"danger");
        }
      });      
    }
  }

  ver(){
    this.vitoria = "S";
    if (
      (this.advIppon > this.euIppon) ||
      (this.advWazari > this.euWazari && this.euIppon == 0) ||
      (this.euShido >= 3)
    )
    {
      this.vitoria = "N";
    }
    if (this.advShido >= 3){
      this.vitoria = "S";
    }
  }

  limparDados(){
    this.TreCampeonato.EmpIdf = 0;
    this.TreCampeonato.TreIdf = 0;
    this.TreCampeonato.TreCamIdf = 0;
    this.TreCampeonato.AluIdf = 0;
    this.TreCampeonato.UsuIdf = 0;
    this.TreCampeonato.TreCamRound = "";
    this.TreCampeonato.TreCamAdvNome = "";
    this.TreCampeonato.TreCamAdvClube = "";
    this.TreCampeonato.TreCamPlacarFavor = "";
    this.TreCampeonato.TreCamPlacarContra = "";
    this.TreCampeonato.TreCamVitoria = true;
    this.TreCampeonato.TreCamObs = "";
    this.TreCampeonato.TreCamTecnico = "";
    this.TreCampeonato.TreCamOrdem = "";
    this.TreCampeonato.TreCamAdvFaixa = 0;  
    this.faixaStr = "10";
  }

  ngOnDestroy(): void {
    if (this.buscarDados != null){
      this.buscarDados.unsubscribe();
    }
    if (this.alterDados != null){
      this.alterDados.unsubscribe();
    }

  }
}


export class campeonatoModel {
  public EmpIdf: number;
  public TreIdf: number;
  public TreCamIdf: number;
  public AluIdf: number;
  public UsuIdf: number;
  public TreCamRound: string;
  public TreCamAdvNome: string;
  public TreCamAdvClube: string;
  public TreCamPlacarFavor: string;
  public TreCamPlacarContra : string;
  public TreCamVitoria: boolean;
  public TreCamObs: string;
  public TreCamTecnico: string;
  public TreCamOrdem: string;
  public TreCamAdvFaixa: number;
}



