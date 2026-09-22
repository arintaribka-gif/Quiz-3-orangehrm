describe('Intercept', () => {
  it('INT-001 - Login dengan Username dan password valid', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('[name="username"]').type('Admin');
    cy.get('[name="password"]').type('admin123');
    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary').as('actionSummary');
    cy.get('button[type="submit"]').click()
    cy.wait('@actionSummary').its('response.statusCode').should('eq', 200);
  })

  it('INT-002 - Login dengan Username yang belum terdaftar', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('[name="username"]').type('notfound');
    cy.get('[name="password"]').type('admin123')
    cy.intercept('POST', '**/auth/validate').as('loginInvalidUser')
    cy.get('button[type="submit"]').click()
    cy.wait('@loginInvalidUser').its('response.statusCode').should('eq', 302)
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials')
  })

  it('INT-003 - Login dengan password yang salah', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('[name="username"]').type('Admin')
    cy.get('[name="password"]').type('salahpassword')
    cy.intercept('POST', '**/auth/validate', (req) => {expect(req.body).to.include('Admin')}).as('loginWrongPass')
    cy.get('button[type="submit"]').click()
    cy.wait('@loginWrongPass')
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials')
  })

  it('INT-004 - Login dengan kolom Username dikosongkan', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('[name="password"]').type('admin123')
    cy.intercept('POST', '**/auth/validate').as('loginEmptyUsername')
    cy.get('button[type="submit"]').click()
    cy.get('.oxd-input-field-error-message').should('have.length', 1).and('contain', 'Required')
    cy.get('@loginEmptyUsername.all').should('have.length', 0)
  })
  
  it('INT-005 - Login dengan kolom password dikosongkan', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('[name="username"]').type('Admin')
    cy.intercept('POST', '**/auth/validate').as('loginEmptyPassword')
    cy.get('button[type="submit"]').click()
    cy.get('.oxd-input-field-error-message').should('have.length', 1).and('contain', 'Required')
    cy.get('@loginEmptyPassword.all').should('have.length', 0)
  })
 
  it('INT-006 - Login dengan Username dan password dikosongkan', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.intercept('POST', '**/auth/validate').as('loginAllEmpty')
    cy.get('button[type="submit"]').click()
    cy.get('.oxd-input-field-error-message').should('have.length', 2).each(($el) => {expect($el.text()).to.equal('Required')})
    cy.get('@loginAllEmpty.all').should('have.length', 0)
  })
 
  it('INT-007 - Login dengan Username huruf kecil semua', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('[name="username"]').type('admin')
    cy.get('[name="password"]').type('admin123')
    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary').as('actionSummaryLowercase')
    cy.get('button[type="submit"]').click()
    cy.wait('@actionSummaryLowercase').then((interception) => {
      expect(interception.response.statusCode).to.eq(200)
      expect(interception.response.body).to.exist
    })
    cy.url().should('include', '/dashboard/index')
  })
 
  it('INT-008 - Login dengan spasi di awal/akhir Username', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('[name="username"]').type(' Admin ')
    cy.get('[name="password"]').type('admin123')
    cy.intercept('POST', '**/auth/validate').as('loginWithSpaces')
    cy.get('button[type="submit"]').click()
    cy.wait('@loginWithSpaces').its('request.headers').should('have.property', 'content-type')
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials')
  })
})