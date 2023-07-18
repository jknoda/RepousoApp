import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ServiceConfig } from '../../../_config/services.config';
import { PessoaModel } from '../../../model/pessoa.model';
import { Api } from 'src/services/api';

@Component({
  selector: 'app-listapessoa',
  templateUrl: './listapessoa.page.html',
  styleUrls: ['./listapessoa.page.scss'],
})
export class ListapessoaPage implements OnInit, OnDestroy {
  EmpIdf: number = ServiceConfig.EMPIDF;
  UsuIdf: number = 0;
  spinner: boolean = false;

  lerDados: Subscription | undefined;
  updateDados: Subscription | undefined;
  buscarDados: Subscription | undefined;
  deletarDados: Subscription | undefined;
  
  //itens: Array<PessoaModel> = [];
  itens : any = [];

  constructor(
    private router:Router,
    private provider:Api,
    public alertController: AlertController,
    public toastController: ToastController
  ) { }

  ngOnInit() {
  }

  async mensagem(mensagem, cor){
    this.spinner = false;
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

  carregar(){
    this.itens = [];
    let dados = {
      empidf: this.EmpIdf
    };
    this.spinner = true;
    this.lerDados = this.provider.dadosApi(dados, '/api/pessoa/findall').subscribe({
      next: (data) => {
        this.itens = data;
        this.spinner = false;
      },
      error: (err) => {
        this.spinner = false;
        let msg = err.error.msg.toString();
        this.mensagem(msg,"danger");
      }
    });  
  }

  addPessoa(){
    return this.router.navigate(['listapessoa/edit-pessoa/0']);
  }

  editar(pessoaidf){
    return this.router.navigate(['listapessoa/edit-pessoa/' + pessoaidf]);
  }

  async showExcluir(pessoaidf) {  
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Atenção!',
      message: 'Exclui esta Pessoa?',
      buttons: [
        {
          text: 'Não',
          cssClass: 'secondary',
        },
        {
          text: 'Sim',
          handler: () => {
            this.excluir(pessoaidf);
          },
        },
      ],
    });
    await alert.present();
  }  

  excluir(pessoaidf){
    let api = "/api/pessoa/delete";
    if (false){
      this.mensagem('Erro!', 'danger');
    }
    else{
      {
        let dados = {
          empidf 	  : this.EmpIdf,
          pessoaidf : pessoaidf
        };
        this.spinner = true;
        this.deletarDados = this.provider.dadosApi(dados, api).subscribe({
          next: (data) => {
            this.itens = [];
            this.mensagem("Pessoa excluida com sucesso!","success");
            this.carregar();
          },
          error: (err) => {
            let msg = err.error.msg.toString();
            this.mensagem(msg,"danger");
          }
        });  
      }
    }    
  }

  //atualizar o list view
  doRefresh(event) {
    setTimeout(() => {
      this.ionViewWillEnter();
      event.target.complete();
    }, 500);
  }  

  ngOnDestroy(): void {
    if (this.lerDados != null){
      this.lerDados.unsubscribe();
    }
  }
}
