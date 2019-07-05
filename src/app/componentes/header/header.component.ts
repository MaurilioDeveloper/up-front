import { LoginService } from './../../services/login.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public logoPath = 'assets/images/positivo.png';

  constructor(public router: Router, public loginService: LoginService) { }

  ngOnInit() {
     // carrega o usuário com as informações da sessão
     // this.carregarUsuario();
  }

  private carregarUsuario() {
    // Caso não encontre ou esteja expirado faz a autenticação
    // if (!this.sessionService.usuario) {
      
    // } 
  }


}
