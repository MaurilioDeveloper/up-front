import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageToastService } from './services/message-toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sistema-atividade-complementar';
  public online: boolean = navigator.onLine;

  constructor(public router: Router, private toastService: MessageToastService) {
  }

  ngOnInit(): void {
    console.log(this.online);
    if (!this.online) {
      this.toastService.showMsgError('Verifique sua conexão com a Internet.', 'Você está Offline.');
    }
  }
}
