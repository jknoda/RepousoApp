import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { Camera } from '@ionic-native/camera/ngx';
import {NgxImageCompressService} from 'ngx-image-compress';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AltersenhaPageModule } from './altersenha/altersenha.module';
import { EmpresaPageModule } from './empresa/empresa.module';
import { PessoaPageModule } from './cadastros/pessoa/cadastropessoa/pessoa.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    AltersenhaPageModule,
    EmpresaPageModule,
    PessoaPageModule
  ],
  providers: [Camera, NgxImageCompressService, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
