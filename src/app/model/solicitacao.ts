import { Aluno } from './aluno';
import { Curso } from './curso';
import { TipoCurso } from './tipoCurso';

export class Solicitacao {
    public id: number;
    public codSolicitacao: number;
    public dsAtividade: string;
    public horasSolicitadas: number;
    public horasDeferidas: number;
    public dhInicio: any;
    public dhFim: any;
    public dsUrlArquivo?: any;
    public flStatus: any;
    public alunoNavigation: Aluno;
    public cursoNavigation: Curso;
    public tipoCursoNavigation: TipoCurso;

    constructor() {
    }
  
  }
  