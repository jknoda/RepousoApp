import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Api } from 'src/services/api';
import { ToastController } from '@ionic/angular';
import { ServiceConfig } from '../../../_config/services.config';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgxImageCompressService } from 'ngx-image-compress';
import { PessoaModel } from 'src/app/model/pessoa.model';

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
  dataNascimento: String = new Date().toISOString();

  tipoadm: boolean = false;
  tipofun: boolean = false;
  tipocui: boolean = false;
  tipopac: boolean = false;

  Pessoa = new PessoaModel;

  imagem: SafeResourceUrl;
  imagemCarregada: SafeResourceUrl;

  lerDados: Subscription | undefined;
  updateDados: Subscription | undefined;
  buscarDados: Subscription | undefined;
  deletarDados: Subscription | undefined;

  novo: boolean = false;

  options: CameraOptions = {
    quality: 30,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  constructor(
    private router:Router, 
    private provider:Api,
    private actRouter:ActivatedRoute,
    public toastController: ToastController,
    private camera: Camera,
    private imageCompress: NgxImageCompressService,
    private sanitizer:DomSanitizer
  ) { }

  ngOnInit() {
    this.actRouter.params.subscribe((data:any)=>{
      this.pessoaidf = data.pessoaidf;
    })      
    if (this.pessoaidf == 0){
      this.novo = true;
    } else {
      this.novo = false;
      this.carregar();
    }
  }

/*   captureImage() {
    this.spinner = true;
    this.camera.getPicture(this.options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.imagem = base64Image;
      this.spinner = false;
    }, (err) => {
      this.mensagem(err, 'danger');
    });
  } */

  compressFile() {
    this.spinner = true;
    this.imageCompress.uploadFile().then(({image, orientation}) => {
        this.imageCompress
            .compressFile(image, orientation, 50, 50, 250, 250) // 50% ratio, 50% quality
            .then(compressedImage => {
                this.imagem = compressedImage;
                this.imagemCarregada = compressedImage;
                this.spinner = false;
            });
    });
  }

  carregar(){
    let tipoAux = this.tipoadm ? 'A' : '';
    tipoAux += this.tipofun ? 'F' : '';
    tipoAux += this.tipocui ? 'C' : '';
    tipoAux += this.tipopac ? 'P' : '';
    let api = "/api/pessoa/find";
    if (false){
      this.mensagem('Erro!', 'danger');
    }
    else{
      {
        let dados = {
          empidf 	  : this.EmpIdf,
          pessoaidf : this.pessoaidf
        };
        this.spinner = true;
        this.updateDados = this.provider.dadosApi(dados, api).subscribe({
          next: (data) => {
            this.spinner = false;
            this.tipoadm = false;
            this.tipofun = false;
            this.tipocui = false;
            this.tipopac = false;
            this.Pessoa.empidf 		  = data.empidf;
            this.Pessoa.pessoaidf     = data.pessoaidf;
            this.Pessoa.cpf           = data.cpf;
            this.Pessoa.nome          = data.nome;
            this.Pessoa.apelido       = data.apelido;
            this.Pessoa.nascimento    = data.nascimento;
            this.Pessoa.fone01        = data.fone01;
            this.Pessoa.fone02        = data.fone02;
            this.Pessoa.fone02obs     = data.fone02obs;
            this.Pessoa.email         = data.email;
            this.Pessoa.tipo          = data.tipo;
            this.Pessoa.foto          = data.foto;
            if (this.Pessoa.tipo.indexOf('A') != -1){
              this.tipoadm = true;
            }
            if (this.Pessoa.tipo.indexOf('F') != -1){
              this.tipofun = true;
            }
            if (this.Pessoa.tipo.indexOf('C') != -1){
              this.tipocui = true;
            }
            if (this.Pessoa.tipo.indexOf('P') != -1){
              this.tipopac = true;
            }
            this.imagemCarregada = data.foto["data"];
            let imagemAux = this.bin2String(data.foto["data"]);
            this.imagem = this.sanitizer.bypassSecurityTrustUrl(imagemAux);
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

  salvar(){
    let tipoAux = this.tipoadm ? 'A' : '';
    tipoAux += this.tipofun ? 'F' : '';
    tipoAux += this.tipocui ? 'C' : '';
    tipoAux += this.tipopac ? 'P' : '';
    let api = "/api/pessoa/create";
    let msg = "Dados incluidos com sucesso!";
    if (!this.novo){
      api = "/api/pessoa/update";
      msg = "Dados alterados com sucesso!";
    }
    if (false){
      this.mensagem('Erro!', 'danger');
    }
    else{
      {
        var data = new Date(this.Pessoa.nascimento);
        var outraData = data.setDate(data.getDate() + 1);
        let dados = {
          empidf 	  : this.EmpIdf,
          pessoaidf : this.Pessoa.pessoaidf,
          cpf       : this.Pessoa.cpf,
          nome      : this.Pessoa.nome,
          apelido   : this.Pessoa.apelido,
          nascimento: outraData,
          fone01    : this.Pessoa.fone01,
          fone02    : this.Pessoa.fone02,
          fone02obs : this.Pessoa.fone02obs,
          email     : this.Pessoa.email,
          tipo      : tipoAux,
          foto      : this.imagemCarregada
        };
        this.spinner = true;
        this.updateDados = this.provider.dadosApi(dados, api).subscribe({
          next: (data) => {
            this.spinner = false;
            if(data['pessoaidf'] != 0){
              this.novo = false;
              this.mensagem(msg, 'success');
            }else{
              this.mensagem('Erro ao incluir pessoa!', 'danger');
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

   retornar(){
    return this.router.navigate(['listapessoa']);
  }

  bin2String(array) {
    var retorno = '';
    //var j = 0;
    for(let j=0;j<array.length;j++){
      retorno = retorno + String.fromCharCode(array[j])
    }
    return retorno;
  }

  async mensagem(mensagem, cor){
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000,
      color: cor,
      position: 'top'
    });
    toast.present();
    this.spinner = false;
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
