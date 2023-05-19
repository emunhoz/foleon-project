describe('[E2E]: Seach', () => {
  it('search publication', () => {
    cy.visit('http://0.0.0.0:3000/')
    cy.contains('Login to continue').click()

    cy.get('input')
      .should('be.enabled')

    cy.get('input')
      .type('Ads')
      .type('{enter}')

    cy.get('li')
      .contains('Ads')

    cy.get('div')
      .contains('Total items: 1')

    cy.get('button')
      .contains('Previous page')
      .should('be.disabled')

      cy.get('button')
      .contains('Next page')
      .should('be.disabled')
  })
})