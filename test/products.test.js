const chai = require ('chai')
const { describe } = require('node:test')
const supertest = require ('supertest')

const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe('Testing para endpoints de productos', () => {

    it('Testing del endpoint GET /api/products, debe traer todos los productos correctamente', async () => {
        const {_body, ok, statusCode } = await requester.get('/api/products')
        
        expect(ok).to.be.true
        expect(statusCode).to.be.equal(200)
        //expect(response.body.status).to.equal('success')
        //expect(response.body.result).to.have.property('products') 
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

        const { statusCode, ok, _body} = await requester.post ('api/products').send(newProduct)

        expect (_body.payload).to.have.property('_id')
        expect (_body.payload.status).to.be.true 
        //expect(response.status).to.equal(200)
        //expect(response.body.status).to.equal('success')
        //expect(response.body.result).to.have.property('_id')    
    })
})
