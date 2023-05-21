describe('[E2E]: Publication list', () => {
  it('display list of publications', () => {
    cy.visit('http://0.0.0.0:3000/')
    cy.contains('Login to continue').click()

    cy.visit('http://0.0.0.0:3000/')
    cy.get('button').contains('Login').click()

    cy.get('li.listItem').its('length').should('eq', 20)
  })
})
