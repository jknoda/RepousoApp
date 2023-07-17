import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Api } from 'src/services/api';
import { ToastController } from '@ionic/angular';
import { ServiceConfig } from '../../../_config/services.config';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.page.html',
  styleUrls: ['./pessoa.page.scss'],
})
export class PessoaPage implements OnInit, OnDestroy {
  EmpIdf: number = ServiceConfig.EMPIDF;
  UsuIdf: number = 0;
  spinner: boolean = false;
  pessoaidf: number = 0;

  lerDados: Subscription | undefined;
  updateDados: Subscription | undefined;
  buscarDados: Subscription | undefined;
  deletarDados: Subscription | undefined;

  constructor(
    private router:Router, 
    private provider:Api,
    private actRouter:ActivatedRoute,
    public toastController: ToastController,
  ) { }

  ngOnInit() {
    this.actRouter.params.subscribe((data:any)=>{
      this.pessoaidf = data.pessoaidf;
    })      
    console.log('PESSOAIDF:',this.pessoaidf);
  }

  alterar(){
    return this.router.navigate(['listapessoa']);
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

  ngOnDestroy(): void {
    if (this.lerDados != null){
      this.lerDados.unsubscribe();
    }
    if (this.buscarDados != null){
      this.buscarDados.unsubscribe();
    }
    if (this.updateDados != null){
      this.updateDados.unsubscribe();
    }
    if (this.deletarDados != null){
      this.deletarDados.unsubscribe();
    }
  }
  
}
