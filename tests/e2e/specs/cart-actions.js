describe('Cart actions', () => {
  it('It adds a product to cart', () => {
    cy.visit('/')
    cy.getBySelector('cart-total').should('have.text', ' pay $0 ')
    cy.getBySelector('cart-empty').should('be.visible')

    cy.getBySelector('add-to-cart').first().click()

    cy.getBySelector('cart-total').should('have.text', ' pay $99 ')
    cy.getBySelector('cart-tile').should('be.visible')
  })

  it('It removes a product from cart', () => {
    cy.visit('/')
    cy.getBySelector('add-to-cart').first().click()
    cy.getBySelector('cart-total').should('have.text', ' pay $99 ')
    cy.getBySelector('cart-tile').should('be.visible')

    cy.getBySelector('remove-item').first().click()
    cy.getBySelector('cart-total').should('have.text', ' pay $0 ')
    cy.getBySelector('cart-empty').should('be.visible')
  })

  it('It changes product quantity from cart', () => {
    cy.visit('/')
    cy.getBySelector('add-to-cart').first().click()
    cy.getBySelector('product-qty').should('have.text', '1')
    cy.getBySelector('cart-total').should('have.text', ' pay $99 ')

    cy.getBySelector('add-item').first().click()
    cy.getBySelector('product-qty').should('have.text', '2')
    cy.getBySelector('cart-total').should('have.text', ' pay $198 ')

    cy.getBySelector('remove-item').first().click()
    cy.getBySelector('product-qty').should('have.text', '1')
    cy.getBySelector('cart-total').should('have.text', ' pay $99 ')
  })
})
