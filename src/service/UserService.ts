import bcrypt from 'bcrypt';
import { User } from "../models/User";

export const createUser = async (email: string, password: string) => {
    const hasUser = await User.findOne({
        where: { email }
    });
    if (!hasUser) {
        const hash = bcrypt.hashSync(password, 10);
        const newUser = await User.create({
            email: email,
            password: hash
        });
        return newUser;
    } else {
        return new Error('email já existe');
    }
};
export const findByEmail = async (email: string) => {
    return await User.findOne({
        where: { email }
    });
};

export const matchPassword = async (passwordText: string, encrypted: string) => {
    return bcrypt.compareSync(passwordText, encrypted);
};

export const listAll = async () => {
    return await User.findAll();
}