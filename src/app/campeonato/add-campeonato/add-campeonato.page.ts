import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Api } from 'src/services/api';
import { ServiceConfig } from '../../_config/services.config'

@Component({
  selector: 'app-add-campeonato',
  templateUrl: './add-campeonato.page.html',
  styleUrls: ['./add-campeonato.page.scss'],
})
export class AddCampeonatoPage implements OnInit, OnDestroy {

  EmpIdf: number = ServiceConfig.EMPIDF;
  TreIdf: number = 0;
  TreTipo: string = "C";
  TreData: Date = new Date();
  TreTitulo: string = "";
  TreObs: string = "";
  TreResponsavel: string = "";
  myDate: String = new Date().toISOString();
  modo = "ADD";
  spinner: boolean = false;

  alterDados: Subscription;

  constructor(
    private router:Router, 
    private provider:Api,
    private actRouter:ActivatedRoute,
    public toastController: ToastController
  ) { }

  ngOnInit() {     
    this.actRouter.params.subscribe((data:any)=>{
      if (data.EmpIdf == null) {
        this.limparCampos();
        this.modo = "ADD";
      }
      else
      {
        this.modo = "UPD";
        this.EmpIdf = data.EmpIdf;
        this.TreIdf = data.TreIdf;
        this.TreTitulo = data.TreTitulo;
        this.TreObs = data.TreObs;
        this.TreData = new Date(data.TreData);
        this.TreResponsavel = data.TreResponsavel;
        this.myDate = this.TreData.toISOString();  
      }
    });    
  }

  campeonatos(){
    this.router.navigate(['campeonato']);
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

  cadastrar(){
    let api = "/api/treino/create";
    let msg = "Campeonato incluido com sucesso!";
    if (this.modo == "UPD"){
      api = "/api/treino/update";
      msg = "Campeonato alterado com sucesso!";
    }
    if (this.TreTitulo == ""){
      this.mensagem('Digite o título!', 'danger');
    }
    else{
      let dados = {
        EmpIdf: this.EmpIdf,
        TreIdf: this.TreIdf,
        TreTipo: this.TreTipo,
        TreData: this.myDate,
        TreTitulo: this.TreTitulo,
        TreObs: this.TreObs,
        TreResponsavel: this.TreResponsavel       
      }
      this.spinner = true;
      this.alterDados = this.provider.dadosApi(dados, api).subscribe({
        next: (data) => {
          this.spinner = false;
          if(data['TreIdf'] != 0){
            this.router.navigate(['campeonato']);
            this.mensagem(msg, 'success');
            this.limparCampos();
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
  
  limparCampos(){
    this.TreIdf = 0;
    this.TreTitulo = "";
    this.TreObs = "";
    this.TreResponsavel = "";
    this.TreData = new Date();
    this.myDate = this.TreData.toISOString();
  }
  ngOnDestroy(): void {
    if (this.alterDados != null){
      this.alterDados.unsubscribe();
    }
  }  

}
