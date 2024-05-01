const chai = require ('chai')
const { describe } = require('node:test')
const supertest = require ('supertest')

const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe('Testing para endpoints de carritos', () => {
    let cid

    it('Testing del endpoint POST /api/carts, debe crear un carrito correctamente', async () => {
        const {_body, ok, statusCode } = await requester.get('/api/carts')

        //controlar validaciones, está tomando undefined
        expect(statusCode).to.be.equal(200)
        expect(_body).to.be.an('array')
        expect(_body.status).to.equal('success')
        expect(_body.payload).to.have.property('_id')
        cid = _body.payload._id
    })

    it('Testing del endpoint GET /api/carts/:cid, debe obtener un carrito por su ID', async () => {
        const cid = '65b189e7d6a8cbec9e0b4264'
        const response = await requester.get(`/api/products/${cid}`)

        expect(response.status).to.equal(200)
        expect(response.body).to.be.an('object')
        expect(response.body.status).to.equal('success')
        //expect(response.body.payload).to.have.property('_id').to.equal(cid) //revisar este no encuentra prop _id
    })

    //revisar completo por permisos
    it('Testing del endpoint POST /api/carts/:cid/products/:pid, debe agregar un producto a un carrito correctamente', async () => {
        const pid = '65b15ebd9e4c274252f9d7fe'
        const { statusCode, ok, _body} = await requester.post(`/api/carts/${cid}/products/${pid}`)
            .set('Authorization', 'Bearer token_de_prueba') //ver autenticación
            .send({ })

        //expect(res).to.have.status(200);  //revisar porque no valida status
        //expect(res.body).to.be.an('object')
        expect (_body.payload.status).to.be.true
        expect (_body.payload).to.have.property('_id').to.equal(cid)
    })
})
