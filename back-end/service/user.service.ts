import { User } from "../model/user";
import userDb from "../repository/user.db";

const createUser = ({
    name,
    email,
    password
}: UserInput):User => {
    if (!name || !email || !password) {
        throw new Error('Invalid input')
    }
    
    const user = new User({
        name,
        email,
        password
    });

    return userDb.createUser(user);
};

const getAllUsers = ():User[] => userDb.getAllUsers();

const getUserByEmail = (email: string):User => {
    if (!email) {
        throw new Error('Email is required');
    }

    const user = userDb.getUserByEmail(email);

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