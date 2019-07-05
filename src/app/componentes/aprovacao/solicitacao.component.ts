import { TipoCursoService } from './../../services/tipo-curso.service';
import { DateFormat } from './../../util/DateFormat';
import { Observable, Subscriber } from 'rxjs';
import { Atividade } from './../../model/atividade';
import { SolicitacaoAtividadeLcs } from './../../model/solicitacaoAtividadeLcs';
import { AtividadeService } from './../../services/atividade.service';
import { CursoService } from './../../services/curso.service';
import { HttpParams } from '@angular/common/http';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators, NgForm } from '@angular/forms';
import { DateAdapter, MatTableDataSource } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { EnumKeyboard } from '../../enum/enum-keyboard.enum';
import { Curso } from '../../model/curso';
import { Solicitacao } from '../../model/solicitacao';
import { LoadingService } from '../../services/loading.service';
import { SolicitacaoService } from '../../services/solicitacao.service';
import { TipoCurso } from 'src/app/model/tipoCurso';
import { MessageToastService } from 'src/app/services/message-toast.service';


@Component({
  selector: 'app-solicitacao',
  templateUrl: './solicitacao.component.html',
  styleUrls: ['./solicitacao.component.scss']
})
export class SolicitacaoComponent implements OnInit {

  constructor(private solicitacaoService: SolicitacaoService, 
              private atividadeService: AtividadeService, 
              private cursoService: CursoService,
              private loadingService: LoadingService,
              private toastService: MessageToastService,
              private adapter: DateAdapter<any>,
              private tipoCursoService: TipoCursoService) { }

  //Childs
  @ViewChild('solicitacaoForm') public solicitacaoForm: NgForm;

  //Constants
  readonly msgSemCertificado = 'Não possui nenhum certificado para aprovação';
  readonly msgCertificadoDeferido = 'Atividade complementar aprovada!';
  readonly msgCertificadoIndeferido = 'Atividade complementar rejeitada!';

  //Objects
  public imagemCertificado = 'https://view.officeapps.live.com/op/embed.aspx?src=https://www.unm.edu/~unmvclib/powerpoint/pptexamples.ppt';
  private httpParams = new HttpParams();
  private files = new Array<File>();
  cursoControl = new FormControl('', [Validators.required]);
  selectFormControl = new FormControl('', Validators.required);
  public solicitacoes: Solicitacao[] = [];
  public solicitacao: Solicitacao;
  public cursos: any;
  public showSemAtividades: Observable<boolean>;

  public displayedColumns = ['anoAtividade', 'dsAtividade', 'cargaHoraria'];

  public solicitacaoAtividadeLcs: SolicitacaoAtividadeLcs[] = [];
  public tiposCurso: TipoCurso[] = [];

  dataSource = new MatTableDataSource<Element>();

  //Variables
  public fileBase64: string;
  public showImageViewer: boolean = true;
  public page: number = 1;
  public urlImagem = '';

  ngOnInit() {
    this.loadCursos();
    this.adapter.setLocale('pt');
    this.showImageViewer = true;
    this.mudarSemAtividade(false);
  }
  public loadCursos() {
    this.loadingService.mostrarLoading(true);
    this.cursoService.getCursosAtividadesPendentes().subscribe(
      result => {
        this.cursos = result.result;
        if (this.cursos.length == 0) {
          this.toastService.showMsgWarning('Não possui nenhum curso com solicitações pendentes');
        }
        console.log(result);
      },
      error => {
        this.toastService.showMsgError('Ocorreu um erro ao buscar cursos');
        this.cursos = [];
        console.error(error);
      });

      this.loadingService.mostrarLoading(false);
  }

  public loadAtividades() {
    this.atividadeService.getAtividadesBySolicitacao(this.solicitacao.id).subscribe(
      result => {
        this.solicitacaoAtividadeLcs = result.result;
        console.log(result);
        if (this.solicitacaoAtividadeLcs.length == 0) {
          this.mudarSemAtividade(true);
        } else {
          this.mudarSemAtividade(false);
        }
        this.dataSource = result.result;
      }, 
      error => {
        this.toastService.showMsgError('Ocorreu um erro ao buscar atividades');
        this.solicitacaoAtividadeLcs = [];
        this.mudarSemAtividade(false);
    });
  }

  public loadsolicitacoes(curso: Curso) {
    if (curso) {
      this.loadingService.mostrarLoading(true);

      this.solicitacaoService.getSolicitacoesByCurso(curso.id).subscribe(
        result => {
          if(result){
            this.page = 1;
            this.solicitacoes = result.result;
            this.tipoCursoService.getTipoCursos().subscribe(
              result => {
                 this.tiposCurso = result.result;
              },
              error => {
                this.toastService.showMsgError('Ocorreu um erro ao buscar tipo cursos');
              }
            )
          }
          if (this.solicitacoes.length == 0) {
            this.toastService.showMsgWarning(this.msgSemCertificado);
          } else {
            console.log('***********************************///////////////////****************')
            this.solicitacao = this.solicitacoes[0];
            this.criaTipoCurso();
            console.log(this.solicitacao);
            this.formatDataInicioDataFim();
            this.loadImagemBySolicitacao(this.solicitacao.id);
            this.loadAtividades();
          }
        },
        error => {
          this.toastService.showMsgError('Ocorreu um erro ao buscar as solicitações');
          console.error(error);
          this.solicitacoes = [];
        });

      this.loadingService.mostrarLoading(false);
    } 
  }

  public selecionaCurso(cursoSelecionado: Curso) {
    console.log(cursoSelecionado);
    this.loadsolicitacoes(cursoSelecionado);
  }
  

  public mudaPagina(proxima: boolean) {
    if ((!proxima && this.page > 1) || (proxima && this.page < this.solicitacoes.length)) {
      this.mudaPaginaPromise(proxima);
    } 
  }

  private mudaPaginaPromise(proxima: boolean) {
    this.loadingService.mostrarLoading(true);
    this.showImageViewer = false;
    if (proxima && this.page < this.solicitacoes.length) {
      let index = this.solicitacoes.indexOf(this.solicitacao);
      if(index >= 0 && index < this.solicitacoes.length - 1) {
        this.solicitacao = this.solicitacoes[index + 1];
        this.criaTipoCurso();
        this.formatDataInicioDataFim();
      }
      this.page++;
    } else if (this.page > 1 && !proxima) {
      console.log('anterior');
      let index = this.solicitacoes.indexOf(this.solicitacao);
      if(index >= 0) {
        this.solicitacao = this.solicitacoes[index - 1];
        this.criaTipoCurso();
        this.formatDataInicioDataFim();
      }
      this.page--;
    }

    this.loadImagemBySolicitacao(this.solicitacao.id);
    this.loadAtividades();

    var promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.showImageViewer = true;
        this.loadingService.mostrarLoading(false);
      }, 10);
    });
    return promise;
  }

  /**
   * Aprovação do certificado
   * Deferir (Conceder, Aceitar)
   * Indeferir (Rejeitar)
   * @param aprovar 
   */
  public deferir(aprovar: boolean) {
    if (this.solicitacaoForm.valid) {
      this.deferirPromise(aprovar);
    } else {
      this.toastService.showMsgError('Preencha todas informações corretamente', 'Formulário inválido.');
    }
  }

  private deferirPromise(aprovar: boolean) {
    let headerModal = '';
    let msgConfirm = '';
    if (aprovar) {
      msgConfirm = 'Deseja aprovar esta atividade complementar?';
    } else {
      msgConfirm = 'Deseja rejeitar esta atividade complementar?';
    }

    this.solicitacaoService.openYesOrNoDialog(msgConfirm, headerModal,
    () => {
      this.loadingService.mostrarLoading(true);
      this.showImageViewer = false;
      let index = this.solicitacoes.indexOf(this.solicitacao);
      if(index >= 0) {
        console.log(this.solicitacao);
        if (aprovar) {
          this.solicitacao.flStatus = 'D';
        } else {
          this.solicitacao.flStatus = 'I';
        }
        this.solicitacaoService.putDeferir(this.solicitacao.id, this.solicitacao).subscribe(
          result => {
            console.log(this.solicitacao);
            console.log(result);
            this.solicitacoes.splice(index, 1);
            if (this.page > 1) {
              //Pega item anterior da lista
              this.solicitacao = this.solicitacoes[index - 1];
              this.criaTipoCurso();
              this.formatDataInicioDataFim();
              this.page--;
              this.showMsgIndeferidoDeferido(aprovar);
            } else if (this.solicitacoes.length >= 1 && this.page == 1) {
              //Pega item anterior da lista
              this.solicitacao = this.solicitacoes[index];
              this.criaTipoCurso();
              this.formatDataInicioDataFim();
              this.showMsgIndeferidoDeferido(aprovar);
            } else {
              this.toastService.showMsgWarning(this.msgSemCertificado);
            }
          },
          error => {
            let msgErro = '';
            if (aprovar) {
              msgErro =  'Ocorreu um erro ao aprovar solicitação';
            } else {
              msgErro =  'Ocorreu um erro ao rejeitar solicitação';
            }

            this.toastService.showMsgError(msgErro);
          });
      }
      var promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          this.showImageViewer = true;
          this.loadingService.mostrarLoading(false);
        }, 10);
      });

      return promise;
    });
  }

  private showMsgIndeferidoDeferido(aprovar: boolean) {
    if (aprovar) {
      this.toastService.showMsgSuccess(this.msgCertificadoDeferido);
    } else {
      this.toastService.showMsgSuccess(this.msgCertificadoIndeferido);
    }
  }

  private mudarSemAtividade (mostra: boolean) {
    this.showSemAtividades = new Observable<boolean>((subscriber: Subscriber<boolean>) => subscriber.next(mostra));
  }

  private formatDataInicioDataFim() {
    if (this.solicitacao.dhInicio instanceof Date) {
      console.log('Data já está formatada');
    } else {
      this.solicitacao.dhInicio = DateFormat.formatDateTime(this.solicitacao.dhInicio);
      this.solicitacao.dhFim = DateFormat.formatDateTime(this.solicitacao.dhFim);
    }
    
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.solicitacoes.length >= 1) {
      if (event.keyCode === EnumKeyboard.F7) {
        if (this.solicitacaoForm.valid) {
          //Deferir (aprovar) Tecla F7
          this.deferir(true);
        }
      }
  
      if (event.keyCode === EnumKeyboard.F4) {
        if (this.solicitacaoForm.valid) {
          //Indeferir (rejeitar) Tecla F4
          this.deferir(false);
        }
      }
    }
  }

  private loadImagemBySolicitacao(id: number) {
    this.solicitacao.dsUrlArquivo = 'http://localhost:4200/assets/images/teste.pdf';
    if (this.solicitacao.dsUrlArquivo.indexOf('.pdf') != -1) {
      console.log('pdf');
      this.solicitacaoService.loadImagemBySolicitacao(id).subscribe( 
        result => {
          this.urlImagem = result;
        }, 
        error => {
          this.toastService.showMsgError('Ocorreu um erro ao buscar imagem do certificado');
          console.log(error);
        }
      )
    } else {
      this.urlImagem = this.solicitacao.dsUrlArquivo;
    }
  }

  private convertArrayBufferToBase64( buffer ) {
      return btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)));
  }

  private criaTipoCurso() {
    if (!this.solicitacao.tipoCursoNavigation) {
      this.solicitacao.tipoCursoNavigation = new TipoCurso();
    }
  }
}
