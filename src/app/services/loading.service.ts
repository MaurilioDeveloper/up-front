import { Injectable } from '@angular/core';
import { Observable, Subscriber, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public showLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  public mostrarLoading (mostra: boolean) {
    console.log("show loading... " + mostra);
    this.showLoading.next(mostra);
  }

}
