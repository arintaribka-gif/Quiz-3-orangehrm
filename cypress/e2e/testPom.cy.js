import loginPage from '../support/loginPage'
import loginData from '../fixtures/logindata.json'

describe('Verifikasi fungsi Login', () => {
    it('TC=001 - Login dengan username valid dan password valid', () => {
        loginPage.masukHalaman()
        loginPage.masukUsername(loginData.usernameValid)
        loginPage.masukanPassword(loginData.passwordValid)
        loginPage.klikLogin()

        loginPage.VerifikasiUrl('/dashboard/index')
    })

    it('TC=002 - Login dengan username yang belum terdaftar', () => {
        loginPage.masukHalaman()
        loginPage.masukUsername(loginData.usernameInvalid)
        loginPage.masukanPassword(loginData.passwordValid)
        loginPage.klikLogin()

        loginPage.VerifikasiPesanError('Invalid credentials')
    })

    it('TC=003 - Login dengan password yang salah', () => {
        loginPage.masukHalaman()
        loginPage.masukUsername(loginData.usernameValid)
        loginPage.masukanPassword(loginData.passwordInvalid)
        loginPage.klikLogin()

        loginPage.VerifikasiPesanError('Invalid credentials')
    })

    it('TC=004 - Login dengan username valid tapi password salah', () => {
        loginPage.masukHalaman()
        loginPage.masukUsername(loginData.usernameValid)
        loginPage.masukanPassword(loginData.passwordInvalid)
        loginPage.klikLogin()

        loginPage.VerifikasiPesanError('Invalid credentials')
    })

    it('TC=005 - Login dengan username dan password kosong', () => {
        loginPage.masukHalaman()
        loginPage.masukUsername(loginData.usernameKosong)
        loginPage.masukanPassword(loginData.passwordKosong)
        loginPage.klikLogin()

        loginPage.VerifikasiJumlahPesanRequired(2)
    })

    it('TC=006 - Login dengan username kosong, password terisi', () => {
        loginPage.masukHalaman()
        loginPage.masukUsername(loginData.usernameKosong)
        loginPage.masukanPassword(loginData.passwordValid)
        loginPage.klikLogin()

        loginPage.VerifikasiJumlahPesanRequired(1)
    })

    it('TC=007 - Login dengan password kosong, username terisi', () => {
        loginPage.masukHalaman()
        loginPage.masukUsername(loginData.usernameValid)
        loginPage.masukanPassword(loginData.passwordKosong)
        loginPage.klikLogin()

        loginPage.VerifikasiJumlahPesanRequired(1)
    })

    it('TC=008 - Verifikasi elemen halaman login tampil dengan benar', () => {
        loginPage.masukHalaman()

        loginPage.VerifikasiElemenHalamanLogin()
    })

    //cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    //cy.get('[name="username"]').type(username)
    //cy.get('[name="password"]').type(password)
    //cy.get('button[type="submit"]').click()
    //cy.url().should('include', pathHarapan)
})
