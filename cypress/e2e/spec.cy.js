describe('Scenario Pengguna dapat login ke akun OrangeHRM', () => {
  it('TC-001 - Login dengan Username dan password valid', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/')
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/dashboard/index')
    cy.get('.oxd-topbar-header-breadcrumb h6').should('have.text', 'Dashboard')
  })

  it('TC-002 - Login dengan Username yang belum terdaftar', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/')
    cy.get('input[name="username"]').type('notfound')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials')
  })

  it('TC-003 - Login dengan password yang salah', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/')
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('salahpassword')
    cy.get('button[type="submit"]').click()
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials')
  })

  it('TC-004 - Login dengan kolom Username dikosongkan', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.get('.oxd-input-field-error-message')
      .should('have.length', 1)
      .and('contain', 'Required')
  })

  it('TC-005 - Login dengan kolom password dikosongkan', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/')
    cy.get('input[name="username"]').type('Admin')
    cy.get('button[type="submit"]').click()
    cy.get('.oxd-input-field-error-message')
      .should('have.length', 1)
      .and('contain', 'Required')
  })
 
  it('TC-006 - Login dengan Username dan password dikosongkan', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/')
    cy.get('button[type="submit"]').click()
    cy.get('.oxd-input-field-error-message')
      .should('have.length', 2)
      .each(($el) => {
        expect($el.text()).to.equal('Required')
      })
  })
 
 
  it('TC-007 - Login dengan Username huruf kecil semua', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/')
    cy.get('input[name="username"]').type('admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/dashboard/index')
  })
 
  it('TC-008 - Login dengan spasi di awal/akhir Username', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/')
    cy.get('input[name="username"]').type(' Admin ')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials')
  })
 

  it('TC-009 - Login menggunakan tombol Enter pada keyboard', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/')
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123{enter}')
    cy.url().should('include', '/dashboard/index')
  })
 
 
  it('TC-010 - Klik tautan "Forgot your password?"', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/')
    cy.get('.orangehrm-login-forgot-header').click()
    cy.url().should('include', '/auth/requestPasswordResetCode')
    cy.contains('h6', 'Reset Password').should('be.visible')
  })
 

  it('TC-011 - Login gagal berulang kali (5x password salah)', () => {
    for (let i = 1; i <= 5; i++) {
      cy.visit('https://opensource-demo.orangehrmlive.com/')
      cy.get('input[name="username"]').type('Admin')
      cy.get('input[name="password"]').type('salahpassword')
      cy.get('button[type="submit"]').click()
      // Tidak ada lockout: pesan tetap "Invalid credentials" pada setiap percobaan
      cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials')
    }
  })
 
  it('TC-012 - Login dengan input SQL Injection pada kolom Username', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/')
    cy.get('input[name="username"]').type("Admin' OR '1'='1")
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials')
  })

})