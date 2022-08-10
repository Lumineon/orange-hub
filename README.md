# OrangeHub

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.0.

## Descrição

Projeto criado com o intuito de aprofundar o conhecimento em Angular, testes unitários e E2E.

## Funções do app

* Pesquisa de usuário do GitHub;
* Mostra detalhes do usuário pesquisado;
* Mostra detalhes do usuário que já foi pesquisado antes, de modo offline (sem conexão com a internet);
* Detalhe dos repositórios do usuário pesquisado;
* Ordenação dos repositórios do usuário pesquisado;

## O que você precisa para rodar o projeto

* Conta criada no [GitHub](https://github.com/)
* Instalar o [Node.js](https://nodejs.org/en/) em sua máquina
* Navegador web (Chrome ou Firefox)
* [Visual Studio Code](https://code.visualstudio.com/) ou outra IDE de sua preferência
> Opcional mas recomendado: [Git](https://git-scm.com/)

## Instalação

* Copie o link desse repositório ou vá em Code > HTTPS e copie o link
* Clone o repositório em sua máquina local 
Você pode fazer isso abrindo o Git e digitando o comando:
```git clone <link do repositorio>```
* Abra o terminal do seu Visual Studio Code (ou do Git ou do CMD) e navegue até a pasta que você clonou o repositório
* Digite o seguinte comando para instalar todas as dependências necessárias para rodar o projeto:
``` npm install```

## Rodando a aplicação
* Para rodar o servidor de desenvolvimento use o seguinte comando:
``` ng serve```
* Para rodar o build, use:
``` ng build```

Se tudo ocorreu bem, você poderá ver a aplicação rodando em http://localhost:4200/

## Testes
#### Unitários
* Para rodar os testes unitários via [Karma](https://karma-runner.github.io) use `ng test`
#### E2E
* Para rodar os testes end-to-end use `ng e2e` ou `cypress:open` para rodar via [Cypress](https://www.cypress.io/)

## Tecnologias utilizadas

* [Angular CLI](https://angular.io/cli)
* [Node.js](https://nodejs.org/en/)
* [TypeScript](https://www.typescriptlang.org/)
* [Github API](https://docs.github.com/en/rest)
* [Jasmine](https://jasmine.github.io/)
* [Karma]((https://karma-runner.github.io))
* [Cypress](https://www.cypress.io/)
* HTML