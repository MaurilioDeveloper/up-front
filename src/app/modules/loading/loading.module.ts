import { LoadingService } from './../../services/loading.service';
import { LoadingComponent } from './../../componentes/loading/loading.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [LoadingComponent],
  imports: [CommonModule],
  exports: [LoadingComponent],
  providers: [LoadingService]
})
export class LoadingModule { }
