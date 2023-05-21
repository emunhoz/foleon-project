describe('[E2E]: Search flow', () => {
  it('search publication by name', () => {
    cy.wait(5000)
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