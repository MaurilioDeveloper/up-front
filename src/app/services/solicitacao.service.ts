import { Router } from '@angular/router';
import { YesOrNoDialogComponent } from '../shared/dialog/yes-or-no-dialog/yes-or-no-dialog.component';
import { Solicitacao } from '../model/solicitacao';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Curso } from '../model/curso';
import { MatDialogConfig, MatDialog } from '@angular/material';
import * as jsPDF from 'jspdf'
import { StandardService } from './standard.service';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService extends StandardService<Solicitacao> {

  public load: BehaviorSubject<Solicitacao> = new BehaviorSubject<Solicitacao>(new Solicitacao());

  constructor(protected httpClient: HttpClient, 
              protected dialog: MatDialog,
              protected router : Router) { 
                super(httpClient, dialog, router)
              }

  /**
   * Busca cursos que possuem atividades complementares pendentes
   */
  public getSolicitacoesByCurso(idCurso: number): Observable<any> {
    return this.get(this.currentURL +  "/solicitacao/GetSolicitacoes/" + idCurso);
  }

  /**
   * Busca Imagem pela solicitacao
   */
  public loadImagemBySolicitacao(id: number): Observable<any>  {
    return this.get(this.currentURL +  "/solicitacao/CarregarCertificado/" + id, 'base64');
  }

  /**
   * Aprovação do certificado. Deferir 'D' (Conceder, Aceitar). Indeferir 'I' (Rejeitar)
   */
  public putDeferir(idSolicitacao: number, solicitacao: Solicitacao): Observable<any> {
    return this.put(this.currentURL +  "/solicitacao/" + idSolicitacao, solicitacao);
  }

  public openYesOrNoDialog(message?: string, title?: string, yesCallback?: Function) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      title: title,
      message: message,
      yesCallback: yesCallback
    };

    this.dialog.open(YesOrNoDialogComponent, dialogConfig);
  }



}
