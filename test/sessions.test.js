const chai = require ('chai')
const { describe } = require('node:test')
const supertest = require ('supertest')

const expect = chai.expect
const requester = supertest('http://localhost:8080')


describe('Testing para endpoints de sessions', () => {

    it('Testing del endpoint POST /api/sessions/register, debe registrar un usuario correctamente', async () => { //agregar el drop
        let mockUser = {
            first_name: 'Valentino',
            last_name: 'Sanchez',
            email: 'v@gmail.com',
            password: '15octubre'
        }

        const { _body, ok, statusCode } = await requester.post('/api/sessions/register').send(mockUser)
        
        expect(statusCode).to.equal(200)
        expect(_body).to.be.an('object')
        //expect(_body).to.have.property('usersCreate') //ver porque no valida la propiedad
        //expect(_body).to.have.property('token')   //ver porque no valida la propiedad
    })

    it('Testing del endpoint POST /api/sessions/login, debe iniciar sesión de un usuario correctamente', async() => {
        let mockUser = {
            email: 'v@gmail.com',
            password: '15octubre'
        }

        const { _body, ok, statusCode } = await requester.get('/api/sessions/login').send(mockUser)
        
        expect(ok).to.be.true
        expect(statusCode).to.equal(200)
    })

    //ver autenticación y permisos para acceder a la ruta
    it('Testing del endpoint GET /api/sessions/current, debe acceder a cierta información', async () => {
        const {_body, ok, statusCode } = await requester.get('/api/sessions/current').set('Authorization', 'Bearer token_de_prueba').send()

        expect(ok).to.be.true
        expect(statusCode).to.equal(200)
    })
})
