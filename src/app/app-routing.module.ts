import { LoginComponent } from './componentes/login/login.component';
import { SolicitacaoComponent } from './componentes/aprovacao/solicitacao.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'login', component: LoginComponent, data: {
    breadcrumb: [
      { label: 'SAC', path: 'login' }
    ],
    hideUsinas: true,
    hideCabecalho: true
  }},
  { path: '', component: LoginComponent, data: {
    breadcrumb: [
      { label: 'SAC', path: 'login' }
    ]
  }},
  { path: 'home', component: SolicitacaoComponent, data: {
    breadcrumb: [
      { label: 'SAC' }
    ]
  }},
  // Rota padrão para erro 404, novas rotas devem ser colocadas antes dessa
  { path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

