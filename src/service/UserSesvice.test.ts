import { User, UserInstance } from "../models/User";
import * as UserService from './UserService';

describe('Testando o UserService', () => {

    let email = 'teste@oi.com.br';
    let password = '1234567';
    let password_2 = '1111111';

    beforeAll(async () => {
        await User.sync({ force: true })
    });

    it('Novo usuário', async () => {
        const newUser = await UserService.createUser(email, password) as UserInstance;
        expect(newUser).not.toBeInstanceOf(Error);
        expect(newUser).toHaveProperty('id');
        expect(newUser.email).toBe(email);
    });

    it('Recriar o mesmo usuário', async () => {
        const newUser = await UserService.createUser(email, password);
        expect(newUser).toBeInstanceOf(Error);
    });

    it('Procurar o usuário pelo email', async () => {
        const user = await UserService.findByEmail(email) as UserInstance;
        expect(user.email).toBe(email);
    });

    it('Conferindo a senha do usuário no banco', async () => {
        const user = await UserService.findByEmail(email) as UserInstance;
        const match = UserService.matchPassword(password, user.password);
        expect(match).toBeTruthy();
    });

    it('Retornando uma lista de usuarios', async () => {
        const users = await UserService.listAll();
        expect(users.length).toBeGreaterThanOrEqual(1);
        for (let i in users) {
            expect(users[i]).toBeInstanceOf(User);
        }
    })
}); 