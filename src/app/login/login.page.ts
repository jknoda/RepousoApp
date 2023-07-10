import { ToastController } from '@ionic/angular';
import { Api } from '../../services/api'
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ServiceConfig } from '../_config/services.config'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  versao: string = ServiceConfig.VERSION;
  usuario: string = "";
  senha: string = "";
  senhaRepetir: string = "";
  nome: string = "";
  data: any;
  EmpIdf: number = ServiceConfig.EMPIDF;
  emailSenha: string = "";

  novo: boolean = false;
  esqueci: boolean = false;
  spinner: boolean = false;

  buscarDados: Subscription | undefined;
  updateDados: Subscription | undefined;
  criarDados: Subscription | undefined;
  enviarEmail: Subscription | undefined;

  constructor(
    private router:Router, 
    private provider:Api,
    public toastController: ToastController,
    
  ) { }

  ngOnInit() {
    this.limparDados();
  }

  private limparDados(){
    localStorage.clear();
    this.usuario = "";
    this.senha = "";
    this.senhaRepetir = "";
    this.nome = "";
    this.novo = false;
    this.data = null;
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

  login(){
    localStorage.clear();
    //this.buscar(1);
    this.loginok();
  }
  private loginok(){
    let erro = true;
    if (true){ //this.data != null){
      if (true) //this.data["UsuSenha"] == this.senha)
      {
        localStorage.setItem("userPerfil","A"); //this.data["UsuPerfil"]);
        localStorage.setItem("userEmail",this.usuario);
        localStorage.setItem("userNome","Nome"); //this.data["UsuAtleta"]);
        localStorage.setItem("userLogado","S");
        localStorage.setItem("usuIdf","0"); //this.data["UsuIdf"]);
        this.spinner = false;
        return this.router.navigate(['folder']);
      }
    }
    if (erro){
      this.mensagem("Usuário/senha inválida!", "danger");
      return true
    }
  }

  signup(){
    this.novo = true;
  }

  criar(){
    if (this.usuario == "" || this.senha == ""){
      this.mensagem('Usuário / Senha inválidos!','danger');
    }
    else if (isNaN(Number(this.senha)) || isNaN(Number(this.senhaRepetir))){
      this.mensagem('Digite somente números na senha e repetir senha!','danger');
    }
    else if(this.senha != this.senhaRepetir){
      this.mensagem('Senha e repetir senha não são iguais!','danger');
    }    
    else{
      this.novo = false;
      this.buscar(2);
    }
  }
  private criarOk(){
    if (this.data == null){
      // insert
      this.insert();
    }
    else {
      this.mensagem("Usuário já existente!", "danger");
    }
  }

  signin(){
    this.novo = false;
    this.esqueci = false;
  }

  esqueciSenha(){
    this.esqueci = true;
    this.emailSenha = "";
  }
  enviarSenha(){
    if (this.emailSenha != ""){
      this.usuario = this.emailSenha;
      this.buscar(3);
    }
    else {
      this.mensagem("Email inválido!", "danger");
    }
 }

  enviarSenhaOk(){
    if (this.emailSenha != "" && this.data != null){
      let senha = this.data["UsuSenha"]
      this.limparDados();
      let dados = {
        to: this.emailSenha,
        cc: "",
        subject: "Esqueci minha senha, envio de senha",
        text: "Senha: " + senha,
        html: ""
      };
      this.spinner = true;
      this.enviarEmail = this.provider.dadosApi(dados, "/api/email/enviargen").subscribe({
        next: (data) => {
            this.spinner = false;
            this.data = data;
            this.mensagem("Email enviado!","success");
        },
        error: (err) => {
          this.spinner = false;
          let msg = err.error.msg.toString();
          this.mensagem(msg,"danger");
        }
      });
      this.esqueci = false;
    }
    else {
      this.mensagem("Email inválido!", "danger");
    }
  }

  buscar(rotina = 0){
    let dados = {
      EmpIdf: this.EmpIdf,
      UsuEmail: this.usuario.toLowerCase()
    };
    this.spinner = true;
    this.buscarDados = this.provider.dadosApi(dados, "/api/usuario/finduser").subscribe({
      next: (data) => {
        this.spinner = false;
          this.data = data;
          switch(rotina) { 
            case 1: { 
                this.loginok();
                break; 
            } 
            case 2: { 
                this.criarOk();
                break; 
            } 
            case 3: { 
              this.enviarSenhaOk();
              break; 
            } 
            default: { 
                return true; 
                break; 
            } 
          };
      },
      error: (err) => {
        this.spinner = false;
        let msg = err.error.msg.toString();
        this.mensagem(msg,"danger");
      }
    });
  }

  insert(){
    if (this.nome == ""){
      this.nome = this.usuario;
    }
    let dados = {
      EmpIdf: this.EmpIdf,
      UsuEmail: this.usuario,
      UsuNome: this.nome, 
      UsuAtleta: this.nome,
      UsuCPF: 0,
      UsuPerfil: 'L', // Aluno
      ReceberEmail: 'S',
      UsuSenha: this.senha
    };
    this.spinner = true;
    this.criarDados = this.provider.dadosApi(dados, "/api/usuario/create").subscribe({
      next: (data) => {
        this.spinner = false;
        this.data = data;
        this.login();
      }
    });
  }  

  ngOnDestroy(): void {
    if (this.buscarDados != null){
      this.buscarDados.unsubscribe();
    }
    if (this.updateDados != null){
      this.updateDados.unsubscribe();
    }
    if (this.criarDados != null){
      this.criarDados.unsubscribe();
    }
    if (this.enviarEmail != null){
      this.enviarEmail.unsubscribe();
    }

  }

}