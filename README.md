# Sistema de Atividades complementares
Esse projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) versão 7.3.9.

## Baixando Dependências
Rode `npm install` para baixar todas as dependências do projeto que está presentes no arquivo `package.json`.

## Instalando Angular CLI 
Rode o comando `npm install @angular/cli` para utilizar comando `ng`.

## Servidor de Desenvolvimento
Rode `ng serve` para um servidor de desenvolvimento. Navegue em `http://localhost:4200/`. A aplicação vai automaticamente recarregar se você mudar qualquer codigo nos arquivos.

## Estrutura de codigos
Rode no seu prompt de comando `ng generate component nome-componente` para gerar um novo componente. Você tambem pode usar `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build
Rode `ng build` para buildar o projeto. O build irá gerar um diretório `dist/` que irá pertencer seus arquivos. Use o `--prod` flag para buildar em modo produção.

## Rodando testes unitarios
Rode `ng test` para executar testes via [Karma](https://karma-runner.github.io).

## Rodando end-to-end testes
Rode `ng e2e` para executar o end-to-end tests via [Protractor](http://www.protractortest.org/).

## Ajudar adicional
Para mais ajuda com o Angular CLI, use o `ng help` ou veja no site [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md)

## Explicação sobre projeto
Projeto responsável por realizar aprovações de atividades complementares solicitadas pelos alunos da Positivo.
A mesma, é processada através de um robô que se autentica no Portal do Aluno Online, vê todos as atividades e certificados que estão pendentes,
realiza a leitura e o processamento desse certificado e grava no banco de dados, pelo qual, a aplicação desenvolvida em .NET irá buscar e retornar
para está aplicação Front-End, que com isso, irá ser apresentada ao usuário da Secretaria, que irá 'Indeferir' (Recusar) ou 'Defirir' (Aprovar) a
atividade solicitada pelos alunos.
Para autenticação do usuário no sistema, terá uma comunicação com a plataforma do Lyceum, pelo qual irá retornar todos os usuários e suas respectivas
areas, ou seja, suas permissões neste sistema.