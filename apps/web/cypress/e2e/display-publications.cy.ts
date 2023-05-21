describe('[E2E]: Publication list', () => {
  it('display list of publications', () => {
    cy.get('button').contains('Login').click()
    cy.get('div.listItem').its('length').should('eq', 20)
  })
})
