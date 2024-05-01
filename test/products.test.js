const chai = require('chai')
const { describe } = require('node:test')
const supertest = require('supertest')

const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe('Testing para endpoints de productos', () => {

    it('Testing del endpoint GET /api/products, debe traer todos los productos correctamente', async () => {
        const {_body, ok, statusCode } = await requester.get('/api/products')
        
        expect(ok).to.be.true
        expect(statusCode).to.be.equal(200)
        expect(_body.status).to.equal('success')
        expect(_body.result).to.have.property('products') //me está dando un {vacío} - ver
    })

    it('Testing del endpoint GET /api/products/:pid, debe obtener un producto por su ID', async () => {
        const productId = '65b15ebd9e4c274252f9d7fe'
        const response = await requester.get(`/api/products/${productId}`)
        
        expect(response.status).to.equal(200)
        expect(response.body.status).to.equal('success')
        expect(response.body.result).to.have.property('title')         
    })

    it('Testing del endpoint POST /api/products, debe crear un nuevo producto', async () => {
        const newProduct = {
        title: 'Producto de prueba',
        price: 10.000,
        stock: 5,      
        }

        const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsbmFtZSI6IkNpbmR5IEdvbWV6IiwiaWQiOiI2NjFlOGQ4Mzg2NTdkMWM5ZjQxMDVhODkiLCJlbWFpbCI6ImdvbWV6LmNpbmR5QGhvdG1haWwuY29tIiwicm9sZSI6IlVTRVJfUFJFTUlVTSIsImlhdCI6MTcxNDU3NzM5MSwiZXhwIjoxNzE0NjYzNzkxfQ.l6ElzaI7YZSwuEJqk25GaWN--1BEejoMtsgoMLp7smY'
        const response = await requester.post('/api/products').set('Authorization', `Bearer ${token}`).send(newProduct)
        
        //no está pasando por propiedades no definidas - revisar
        expect(response.status).to.be.equal(200)
        expect(response.body.payload).to.have.property('_id')
        expect(response.body.payload.status).to.be.true
    })
})
