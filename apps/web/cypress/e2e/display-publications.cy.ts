describe('[E2E]: Publication list', () => {
  it('display publications', () => {
    cy.visit('http://0.0.0.0:3000/')
    cy.contains('Login to continue').click()

    cy.get('input')
      .should('be.enabled')

    cy.get('button')
      .contains('Previous page')
      .should('be.disabled')

      cy.get('button')
      .contains('Next page')
      .should('be.enabled')
  })
})
