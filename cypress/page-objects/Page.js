/// <reference types="cypress" />

export default class Page {
  constructor(user, url = '/') {
    const { email, senha } = user;
    this.email = email;
    this.senha = senha;
    this.url = url;
  }

  visit() {
    cy.wait(2000);
    cy.visit(this.url);
  }

  login() {
    cy.task('loginPuppeteer', {
      email: this.email,
      senha: this.senha,
      root: Cypress.env('http://localhost:4200/#/')
    }).then(creds => {
      Cypress.env(creds);
    });
  }
}
