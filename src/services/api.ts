import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceConfig } from '../app/_config/services.config'

@Injectable({providedIn: 'root',})
export class Api{
    server: string = ServiceConfig.API_ENDPOINT; 
    constructor(private http : HttpClient){      
    }

    dadosApi(dados: any, api: string): Observable<any>{
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type' : 'application/json'})
        }
        let url = this.server + api;
        return this.http.post(url, JSON.stringify(dados), httpOptions);
    }
}
