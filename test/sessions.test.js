const chai = require ('chai')
const { describe } = require('node:test')
const supertest = require ('supertest')

const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe('Testing para endpoints de sessions', () => {

    it('Testing del endpoint POST /api/sessions/register, debe registrar un usuario correctamente', async () => {
        const userData = {
            first_name: 'Nombre',
            last_name: 'Apellido',
            email: 'correo@example.com',
            password: 'contraseña',
            role: 'USER'
        }

        const {_body, ok, statusCode } = await requester.get('/api/sessions/register').send(userData)
        
        expect(ok).to.be.true
        expect(statusCode).to.equal(200)
        expect(_body).to.be.an('object')
        expect(_body.status).to.equal('success')
        expect(_body.payload).to.be.an('object')
        expect(_body.payload).to.have.property('usersCreate')
        expect(_body.payload).to.have.property('token')

    })

    it('Testing del endpoint POST /api/sessions/login, debe iniciar sesión de un usuario correctamente', async () => {
        const userData = {
            email: 'correo@example.com',
            password: 'contraseña'
        }

        const {_body, ok, statusCode } = await requester.get('/api/sessions/login').send(userData)
                
        expect(ok).to.be.true
        expect(statusCode).to.equal(200)
        expect(_body).to.be.an('object')
        expect(_body.status).to.equal('success')
        expect(_body.payload).to.be.an('object')
        expect(_body.payload).to.have.property('fullname')
        expect(_body.payload).to.have.property('email')
        expect(_body.payload).to.have.property('role')
    })

    it('Testing del endpoint GET /api/sessions/current, debe acceder a cierta información', async () => {
        const {_body, ok, statusCode } = await requester.get('/api/sessions/current')
            .set('Authorization', 'Bearer token_de_prueba') // ver autenticación
            .send()

        expect(ok).to.be.true
        expect(statusCode).to.equal(200)
        expect(_body).to.be.an('object')
        expect(_body).to.have.property('fullname')
        expect(_body).to.have.property('email')
        expect(_body).to.have.property('role')
    })
})
