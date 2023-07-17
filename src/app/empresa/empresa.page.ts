import { Component, OnDestroy, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { EmpresaModel } from '../model/empresa.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Api } from 'src/services/api';
import { AlertController, ToastController } from '@ionic/angular';

export interface imgFile {
  name: string;
  filepath: string;
  size: number;
}

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.page.html',
  styleUrls: ['./empresa.page.scss'],
})
export class EmpresaPage implements OnInit, OnDestroy {

  Empresa = new EmpresaModel;
  novo = true;

  uploadedFile : any;
  uploadedName: any;
  logoempresa: SafeResourceUrl;

  spinner: boolean = false;

  alterDadosEmpresa: Subscription;
  deleteDadosEmpresa: Subscription;
  lerDadosEmpresa: Subscription;

  constructor(
    private router:Router, 
    private provider:Api,
    private actRouter:ActivatedRoute,
    public toastController: ToastController,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.novo = true;
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

  salvar(){
    let api = "/api/empresa/create";
    let msg = "Dados incluidos com sucesso!";
    if (!this.novo){
      api = "/api/empresa/update";
      msg = "Dados alterados com sucesso!";
    }
    if (false){
      this.mensagem('Erro!', 'danger');
    }
    else{
      {
        let dados = {
          empidf          : this.Empresa.empidf,
          empcnpj         : this.Empresa.empcnpj,
          emprazao        : this.Empresa.emprazao,
          empfantasia     : this.Empresa.empfantasia,
          empcep          : this.Empresa.empcep,
          emplogradouro   : this.Empresa.emplogradouro,
          emplognum       : this.Empresa.emplognum,
          empbairro       : this.Empresa.empbairro,
          empcidade       : this.Empresa.empcidade,
          empuf           : this.Empresa.empuf,
          empcomplemento  : this.Empresa.empcomplemento,
          empfone01       : this.Empresa.empfone01,
          empfone02       : this.Empresa.empfone02,
          empemail        : this.Empresa.empemail,
          emplogo         : this.uploadedFile,
          empsenha        : this.Empresa.empsenha
        };
        this.spinner = true;
        this.alterDadosEmpresa = this.provider.dadosApi(dados, api).subscribe({
          next: (data) => {
            this.spinner = false;
            if(data['empidf'] != 0){
              this.novo = false;
              this.mensagem(msg, 'success');
            }else{
              this.mensagem('Erro ao incluir empresa!', 'danger');
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
  }

  private ler(nome, arquivo)
  {
    this.uploadedFile = arquivo;
    this.uploadedName = nome;
    this.mostrarFoto(arquivo);
  }

  uploadImage(event) {
    const file: any = event.target.files[0];
    let formData = new FormData();

    // Add the file that was just added to the form data
    formData.append("photo", file, file.name);

    let fileReader = new FileReader();
    let _this = this;
      fileReader.readAsDataURL(file);
      fileReader.onloadend = function () {
          _this.ler(file.name, fileReader.result);
    }
    /*
    // Image validation
    if (file.type.split('/')[0] !== 'image') {
      console.log('File type is not supported!');
      return;
    }
   
    // Storage path
    const fileStoragePath = `filesStorage/${new Date().getTime()}_${file.name}`;
    // Image reference
    */
  }

  mostrarFoto(arquivo)
  {
    this.logoempresa = arquivo; 
  }

  ngOnDestroy(): void {
    if (this.alterDadosEmpresa != null){
      this.alterDadosEmpresa.unsubscribe();
    }
    if (this.lerDadosEmpresa != null){
      this.lerDadosEmpresa.unsubscribe();
    }
    if (this.deleteDadosEmpresa != null){
      this.deleteDadosEmpresa.unsubscribe();
    }
  }

}
