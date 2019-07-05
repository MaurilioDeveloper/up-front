import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private router: Router) { }

  public login() {
    this.router.navigate(['/home']);
  }

  public logout() {
    this.router.navigate(['/']);
  }
}
