import { Validators, FormControl } from '@angular/forms';
import { LoginService } from './../../services/login.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public usuario: Usuario = new Usuario();

  constructor(public loginService: LoginService ) { }

  ngOnInit() {
  }
}
