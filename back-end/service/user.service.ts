import { User } from "../model/user";
import userDb from "../repository/user.db";
import { UserInput } from "../types";

const createUser = async ({
    name,
    email,
    password
}: UserInput):Promise<User> => {
    if (!name || !email || !password) {
        throw new Error('Invalid input')
    }
    
    const user = new User({
        name,
        email,
        password
    });

    return await userDb.createUser(user);
};

const getAllUsers = async ():Promise<User[]> => await userDb.getAllUsers();

const getUserByEmail = async (email: string):Promise<User> => {
    if (!email) {
        throw new Error('Email is required');
    }

    const user = await userDb.getUserByEmail({email});

    if (!user) {
        throw new Error('User not found');
    }

    return user;
};

export default {
    createUser,
    getAllUsers,
    getUserByEmail,
};