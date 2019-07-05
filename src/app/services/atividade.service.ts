import { Observable } from 'rxjs';
import { Atividade } from './../model/atividade';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { StandardService } from './standard.service';

@Injectable({
  providedIn: 'root'
})
export class AtividadeService extends StandardService<Atividade> {

  constructor(protected httpClient: HttpClient, 
              protected dialog: MatDialog,
              protected router : Router) {
    super(httpClient, dialog, router);
  }

  /**
   * Busca as atividades complementares pelo curso que está selecionado
   */
  public getAtividadesBySolicitacao(idSolicitacao: number): Observable<any>  {
    return this.get(this.currentURL + "/atividade/GetAtividadeBySolicitacao/" + idSolicitacao);
  }
}
