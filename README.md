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
> Opcional mas recomendado: [Angular CLI](https://angular.io/cli) para rodar o projeto com comandos `ng`

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
``` npm start``` ou ``` ng serve``` caso tenha o [Angular CLI](https://angular.io/cli) instalado
* Para rodar o build, use:
``` npm build``` ou ``` ng build``` caso tenha o [Angular CLI](https://angular.io/cli) instalado

Se tudo ocorreu bem, você poderá ver a aplicação rodando em http://localhost:4200/

## Testes
#### Unitários
* Para rodar os testes unitários via [Karma](https://karma-runner.github.io) use `npm start` ou `ng test`
Isso abrirá uma janela do seu navegador com o [Karma](https://karma-runner.github.io) e ele executará os testes unitários que foram criados.
> Os testes unitários estão localizados dentro de cada componente do projeto. São marcados com a extensão `.spec.ts` e os resultados dos testes ficam disponíveis na própria janela do Karma.

#### E2E
* Para rodar os testes end-to-end use `npm run e2e`. Caso tenha o [Cypress](https://www.cypress.io/) instalado, esse comando rodará o projeto localmente e abrirá uma janela no navegador escolhido com o Cypress
Em seguida, clique em `E2E Testing` e clique na spec `home.cy.ts`
* ou rode `ng e2e` caso tenha o [Angular CLI](https://angular.io/cli) instalado
* ou rode `npm start` para rodar a aplicação e em seguida rode `npm cypress:open` ou até mesmo `npm cypress:run` para rodar via [Cypress](https://www.cypress.io/)
> Os testes E2E estão localizados no seguinte caminho: `Cypress > e2e > home.cy.ts` e os resultados dos testes ficam disponíveis na própria janela do Cypress.

## Tecnologias utilizadas

* [Angular CLI](https://angular.io/cli)
* [Node.js](https://nodejs.org/en/)
* [TypeScript](https://www.typescriptlang.org/)
* [Github API](https://docs.github.com/en/rest)
* [Jasmine](https://jasmine.github.io/)
* [Karma](https://karma-runner.github.io)
* [Cypress](https://www.cypress.io/)
* HTML