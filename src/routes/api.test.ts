import request from 'supertest';

import { User } from '../models/User';
import app from '../app';



describe('Teste das rotas da Api', () => {

    let email = 'teste@oi.com.br';
    let password = '1234567';

    beforeAll(async () => {
        await User.sync({ force: true })
    });


    it('Rota Ping Pong', () => {
        request(app)
            .get('/ping')
            .then(response => {
                expect(response.body.pong).toBeTruthy();
                return;
            });

    });


    it('Registrando um novo usuário', () => {
        request(app)
            .post('/register')
            .send(`email=${email}&password=${password}`)
            .then(response => {
                expect(response.body.console.error).toBe('email já existe');
                expect(response.body).toHaveProperty('id');
                return;
            });

    });

});