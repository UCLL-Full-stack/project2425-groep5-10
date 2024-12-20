import { User } from '../model/user';
import database from './database';

const createUser = async ({name, email, password, role }: User): Promise<User> => {
    try {
        const userPrisma = await database.user.create({
            data: {
                name,
                email,
                password,
                role,
            },
        });

        return User.from(userPrisma);
    } catch (error) {
        throw new Error('Database error. See server log for details');
    }
}

const getAllUsers = async (): Promise<User[]> => {
    try {
        const userPrismas = await database.user.findMany();
        return userPrismas.map(User.from);
    } catch (error) {
        throw new Error('Database error. See server log for details');
    }
}

const getUserById = async (id: number): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: {
                id,
            },
        });

        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        throw new Error('Database error. See server log for details');
    }
}

const getUserByEmail = async ({ email }: { email: string }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: {
                email,
            },
        });

        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        throw new Error('Database error. See server log for details');
    }
}

export default {
    createUser,
    getAllUsers,
    getUserByEmail,
    getUserById,
};