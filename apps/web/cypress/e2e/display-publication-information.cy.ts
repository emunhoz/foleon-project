describe('[E2E]: Details', () => {
  it('publication details page', () => {
    cy.get('a')
    .contains('Ads')
    .click()

    cy.url().should('contain', '82224')

    cy.get('h1')
      .contains('Project ID: 82224')
  })
})