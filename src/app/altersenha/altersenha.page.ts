import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Api } from 'src/services/api';
import { ServiceConfig } from '../_config/services.config'

@Component({
  selector: 'app-altersenha',
  templateUrl: './altersenha.page.html',
  styleUrls: ['./altersenha.page.scss'],
})
export class AltersenhaPage implements OnInit, OnDestroy {

  senha: string = "";
  senhaRepetir: string = "";
  nome: string = "";
  EmpIdf: number = ServiceConfig.EMPIDF;
  UsuIdf: number = 0;
  spinner: boolean = false;

  updateDados: Subscription | undefined;
  buscarDados: Subscription | undefined;

  constructor(
    private router:Router, 
    private provider:Api,
    public toastController: ToastController,
    
  ) { }

  ngOnInit() {
    this.buscar();
  }

  async mensagem(mensagem, cor){
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 3000,
      color: cor,
      position: 'top'
    });
    toast.present();
  }

  buscar(){
    let dados = {
      EmpIdf: this.EmpIdf,
      UsuEmail: localStorage.getItem("userEmail")
    };
    this.spinner = true;
    this.buscarDados = this.provider.dadosApi(dados, "/api/usuario/finduser").subscribe({
      next: (data) => {
        this.spinner = false;
          this.nome = data["UsuAtleta"];
          this.UsuIdf = data["UsuIdf"];
      },
      error: (err) => {
        this.spinner = false;
        let msg = err.error.errors.toString();
        this.mensagem(msg,"danger");
      }
    });
  }

  alterar(){
    if (this.senha == ""){
      this.mensagem('Usuário / Senha inválidos!','danger');
    }
    else if (isNaN(Number(this.senha)) || isNaN(Number(this.senhaRepetir))){
      this.mensagem('Digite somente números na senha e repetir senha!','danger');
    }
    else if(this.senha != this.senhaRepetir){
      this.mensagem('Senha e repetir senha não são iguais!','danger');
    }    
    else if (this.senha == this.senhaRepetir && this.senha != ""){
      let dados = {
        EmpIdf: this.EmpIdf,
        UsuIdf: this.UsuIdf,
        UsuAtleta: this.nome,
        UsuSenha: this.senha
      };
      this.spinner = true;
      this.updateDados = this.provider.dadosApi(dados, "/api/usuario/updatesenha").subscribe({
        next: (data) => {
          this.spinner = false;
          this.mensagem("Dados alterados!", "success");
          return this.router.navigate(['login']);
        },
        error: (err) => {
          this.spinner = false;
          let msg = err.error.errors.toString();
          this.mensagem(msg,"danger");
        }
      });
    }
    else {
      this.mensagem("Senha ou senha repita inválida!", "danger");
    }
  }
  
  ngOnDestroy(): void {
    if (this.updateDados != null){
      this.updateDados.unsubscribe();
    }
    if (this.buscarDados != null){
      this.buscarDados.unsubscribe();
    }
  }

}
