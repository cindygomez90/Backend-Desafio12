const chai = require('chai')
const { describe } = require('node:test')
const supertest = require('supertest')
const { generateToken } = require ('../ecommerce/src/utils/jsonwebtoken.js')

const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe('Testing para endpoints de productos', () => {

    it('Testing del endpoint GET /api/products, debe traer todos los productos correctamente', async () => {
        const {_body, ok, statusCode } = await requester.get('/api/products')
        
        expect(ok).to.be.true
        expect(statusCode).to.be.equal(200)
        expect(_body.status).to.equal('success')
        expect(_body.result).to.have.property('products')
    })

    it('Testing del endpoint GET /api/products/:pid, debe obtener un producto por su ID', async () => {
        const productId = '65b15ebd9e4c274252f9d7fe'
        const response = await requester.get(`/api/products/${productId}`)
        
        expect(response.status).to.equal(200)
        expect(response.body.status).to.equal('success')
        expect(response.body.result).to.have.property('_id') 
        expect(response.body.result).to.have.property('title')         
    })


    it('Testing del endpoint POST /api/products, debe crear un nuevo producto si es un usuario autorizado', async () => {
        
        const token = generateToken({ 
            id: 'i65ece9c82540d110accd59ef', 
            role: 'ADMIN' 
        })

        const productNew = {
        title: 'Producto de prueba',
        price: 10.000,
        stock: 5,      
        }

        const response = await requester.post('/api/products').set('Authorization', `Bearer ${token}`).send(productNew)
            
        console.log(response.body)

        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('product')

        //const createdProduct = response.body.product
        //expect(createdProduct).to.have.property('title', 'Producto de prueba')
        //expect(createdProduct).to.have.property('price', 10.000)
        //expect(createdProduct).to.have.property('stock', 5)
    })
        
})
