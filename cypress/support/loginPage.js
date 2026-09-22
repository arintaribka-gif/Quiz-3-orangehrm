class loginPage{
    masukHalaman(){
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    }
    masukUsername(username){
        username && cy.get('[name="username"]').type(username)
    }
        masukanPassword(password){
        password && cy.get('[name="password"]').type(password)
    }
    klikLogin(){
        cy.get('button[type="submit"]').click()
    }
    VerifikasiUrl(pathHarapan){
        cy.url().should('include', pathHarapan)
    }
    VerifikasiPesanError(pesanHarapan){
        cy.get('.oxd-alert-content-text').should('be.visible').and('contain.text', pesanHarapan)
    }
    VerifikasiJumlahPesanRequired(jumlah){
        cy.get('.oxd-input-field-error-message').should('have.length', jumlah)
    }
     klikLupaPassword(){
        cy.get('.orangehrm-login-forgot-header').click()
    }
     VerifikasiHalamanLupaPassword(){
        cy.get('.orangehrm-forgot-password-title').should('be.visible').and('contain.text', 'Reset Password')
    }
    VerifikasiElemenHalamanLogin(){
        cy.get('.orangehrm-login-branding img').should('be.visible')
        cy.get('.orangehrm-login-form').should('be.visible')
        cy.get('[name="username"]').should('be.visible')
        cy.get('[name="password"]').should('be.visible')
    }
}

export default new loginPage()