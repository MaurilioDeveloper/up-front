import { Observable } from 'rxjs';
import { Curso } from './../model/curso';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { StandardService } from './standard.service';

@Injectable({
  providedIn: 'root'
})
export class CursoService extends StandardService<Curso> {

  constructor(protected httpClient: HttpClient, 
              protected router : Router) { 
      super(httpClient, null, router);
  }

  /**
   * Busca cursos que possuem atividades complementares pendentes
   */
  public getCursosAtividadesPendentes(): Observable<any> {
    return this.get(this.currentURL + "/curso/GetCurso");
  }
}
