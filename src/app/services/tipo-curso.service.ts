import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { StandardService } from './standard.service';
import { Injectable } from '@angular/core';
import { TipoCurso } from '../model/tipoCurso';

@Injectable({
  providedIn: 'root'
})
export class TipoCursoService extends StandardService<TipoCurso> {

  constructor(protected httpClient: HttpClient, 
              protected router : Router) { 
      super(httpClient, null, router);
  }

  /**
   * Busca cursos que possuem atividades complementares pendentes
   */
  public getTipoCursos(): Observable<any> {
    return this.get(this.currentURL   + "/tipocurso/Get");
  }
}
