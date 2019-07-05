import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StandardService<T> {
  
  readonly currentURL = environment.api_url;

  constructor(protected httpClient: HttpClient, 
    protected dialog?: MatDialog,
    protected router? : Router) { }

    public get(url: string, retorno?: string): Observable<any> {
      if (retorno == 'base64') {
        return this.httpClient.get(url,  {responseType: 'text'});
      } 
      return this.httpClient.get(url);
    }

    public put(url: string, dados: T): Observable<any> {
      return this.httpClient.put(url, dados, {responseType: 'text'});
    }
}
