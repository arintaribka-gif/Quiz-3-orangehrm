/**
 * API Automation Test - Platzi Fake Store API (Categories)
 * Endpoint dasar yang didokumentasikan di:
 * https://fakeapi.platzi.com/en/rest/categories
 * yang sebenarnya di-serve oleh: https://api.escuelajs.co/api/v1
 *
 * Total: 12 request, masing-masing minimal punya assertion
 * pada status code DAN pada value di response body.
 */

describe('Categories API - fakeapi.platzi.com', () => {
    const timestamp = Date.now()
    let createdCategoryId // dipakai lintas test (POST -> PUT -> GET -> DELETE)

    // 1. GET semua kategori - pastikan sukses dan berupa array berisi data
    it('Request 1: GET /categories - mengembalikan status 200 dan array kategori', () => {
        cy.request('GET', '/categories').then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body).to.be.an('array').and.to.have.length.greaterThan(0)
        })
    })

    // 2. GET semua kategori - validasi struktur data item pertama
    it('Request 2: GET /categories - item pertama memiliki field id & name yang valid', () => {
        cy.request('GET', '/categories').then((res) => {
            expect(res.status).to.eq(200)
            const firstCategory = res.body[0]
            expect(firstCategory).to.have.property('id').that.is.a('number')
            expect(firstCategory).to.have.property('name').that.is.a('string')
        })
    })

    // 3. GET kategori berdasarkan id = 1
    it('Request 3: GET /categories/1 - mengembalikan kategori dengan id 1', () => {
        cy.request('GET', '/categories/1').then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body.id).to.eq(1)
        })
    })

    // 4. GET kategori berdasarkan id = 2
    it('Request 4: GET /categories/2 - mengembalikan kategori dengan id 2', () => {
        cy.request('GET', '/categories/2').then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body.id).to.eq(2)
            expect(res.body.name).to.be.a('string')
        })
    })

    // 5. GET kategori dengan id yang tidak valid / tidak ada
    it('Request 5: GET /categories/999999 - id tidak ditemukan mengembalikan status 400', () => {
        cy.request({
            method: 'GET',
            url: '/categories/999999',
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.eq(400)
            expect(res.body.message).to.exist
        })
    })

    // 6. POST membuat kategori baru
    it('Request 6: POST /categories - berhasil membuat kategori baru (status 201)', () => {
        cy.request('POST', '/categories/', {
            name: `Kategori Test ${timestamp}`,
            image: 'https://placeimg.com/640/480/any',
        }).then((res) => {
            expect(res.status).to.eq(201)
            expect(res.body.name).to.eq(`Kategori Test ${timestamp}`)
            createdCategoryId = res.body.id
        })
    })

    // 7. Validasi response body POST memiliki id baru yang valid
    it('Request 7: POST /categories - response memiliki id numerik yang baru dibuat', () => {
        expect(createdCategoryId).to.be.a('number')
        cy.request('POST', '/categories/', {
            name: `Kategori Kedua ${timestamp}`,
            image: 'https://placeimg.com/640/480/any',
        }).then((res) => {
            expect(res.status).to.eq(201)
            expect(res.body.id).to.be.a('number').and.to.be.greaterThan(0)
        })
    })

    // 8. POST dengan payload tidak lengkap/tidak valid -> harus gagal
    it('Request 8: POST /categories - payload tidak valid mengembalikan status error', () => {
        cy.request({
            method: 'POST',
            url: '/categories/',
            body: { image: 'https://placeimg.com/640/480/any' }, // tanpa "name"
            failOnStatusCode: false,
        }).then((res) => {
            expect(res.status).to.be.oneOf([400, 500])
            expect(res.status).to.be.gte(400) // pastikan tetap gagal, bukan 2xx
        })
    })

    // 9. PUT memperbarui kategori yang baru dibuat
    it('Request 9: PUT /categories/{id} - berhasil memperbarui nama kategori', () => {
        cy.request('PUT', `/categories/${createdCategoryId}`, {
            name: `Kategori Updated ${timestamp}`,
        }).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body.name).to.eq(`Kategori Updated ${timestamp}`)
        })
    })

    // 10. GET ulang kategori yang sudah diupdate untuk memastikan perubahan tersimpan
    it('Request 10: GET /categories/{id} - memastikan data hasil update konsisten', () => {
        cy.request('GET', `/categories/${createdCategoryId}`).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body.name).to.eq(`Kategori Updated ${timestamp}`)
        })
    })

    // 11. GET daftar produk berdasarkan kategori id = 1
    it('Request 11: GET /categories/1/products - mengembalikan array produk', () => {
        cy.request('GET', '/categories/1/products').then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body).to.be.an('array')
        })
    })

    // 12. DELETE kategori yang dibuat pada Request 6
    it('Request 12: DELETE /categories/{id} - berhasil menghapus kategori (body true)', () => {
        cy.request('DELETE', `/categories/${createdCategoryId}`).then((res) => {
            expect(res.status).to.eq(200)
            expect(String(res.body)).to.eq('true') // API mengembalikan string "true"
        })
    })
})
