/// <reference types="cypress" />

describe("Teste Google", function(){

  it("Buscar e guardar imagem Google", function() {
      cy.wait(300)
      cy.visit('http://www.google.com')
      cy.get('#hplogo')
  })

  it("Teste para validar se guardou/achou imagem", function() {
      var Achou = cy.get('[id="hplogo"]')
      .invoke('attr', 'id')
      .should('equal', 'hplogo')

      return Achou
  })
})
