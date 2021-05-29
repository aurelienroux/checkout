describe('Product tile actions', () => {
  it('It changes current variant', () => {
    cy.visit('/')
    cy.getBySelector('product-price').eq(0).should('have.text', '$99')
    cy.getBySelector('btn-variant').eq(3).click()
    cy.getBySelector('product-price').eq(0).should('have.text', '$115')
  })
})
