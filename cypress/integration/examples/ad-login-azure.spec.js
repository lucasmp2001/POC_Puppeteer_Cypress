/// <reference types="cypress" />

describe("Login Azure Cypress/Puppeteer", function(){

  it("Login using Puppeteer, after passing credencials for Cypress in sessionStorage.", function() {
    cy.visit('http://localhost:4200/#/')
      cy.task('loginPuppeteer', {username: 'l.pinheiro@reply.com', password: 'Lu645600#', url: 'http://localhost:4200/#/' }).then(creds => {
        cy.wait(1500)
        cy.reload()
        cy.visit('http://localhost:4200/#/')
        const keys = Object.keys(creds);
        for (var i = 0; i < keys.length; i++) {
          window.sessionStorage.setItem(keys[i], creds[keys[i]]);
        }
        cy.wait(1000)
        cy.get('#perfil').click()
      })

      })
})
