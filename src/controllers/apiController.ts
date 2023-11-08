import { Request, Response } from 'express';
import * as useService from '../service/UserService';

export const ping = (req: Request, res: Response) => {
    res.json({ pong: true });
}

export const register = async (req: Request, res: Response) => {
    if (req.body.email && req.body.password) {

        let { email, password } = req.body;

        const newUser = await useService.createUser(email, password);

        if (newUser instanceof Error) {
            return res.json({ error: newUser.message });
        } else {
            res.status(201);
            return res.json({ id: newUser.id });
        };
        return;
    };
    res.json({ error: 'email e/ou senha não enviados' });
};


export const login = async (req: Request, res: Response) => {
    if (req.body.email && req.body.password) {

        let email: string = req.body.email;
        let password: string = req.body.password;

        const user = await useService.findByEmail(email);

        if (user) {

            const match = await useService.matchPassword(password, user.password)
            if (match) {
                res.json({ status: true });
                return;
            };
        };
    };
    res.json({ status: false });
};

export const list = async (req: Request, res: Response) => {
    let users = await useService.listAll();
    let list: string[] = [];

    for (let i in users) {
        list.push(users[i].email);
    }

    res.json({ list });
}