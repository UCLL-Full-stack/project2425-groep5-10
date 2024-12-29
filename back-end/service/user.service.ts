import { User } from "../model/user";
import userDb from "../repository/user.db";
import { AuthenticationResponse, UserInput } from "../types";
import bcrypt from 'bcrypt';
import { generateSWTtoken } from "../util/jwt";

const createUser = async ({
    name,
    email,
    password,
    role
}: UserInput):Promise<User> => {
    const existingUser = await userDb.getUserByEmail({email});

    if (existingUser) {
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!name || !email || !password) {
        throw new Error('Invalid input')
    }
    
    const user = new User({
        name,
        email,
        password:hashedPassword,
        role
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

const authenticate = async ({name,email,password,role}:UserInput):Promise<AuthenticationResponse> => {
    const user = await userDb.getUserByEmail({email});

    if (!user) {
        throw new Error('User not found');
    }

    const validPassword = await bcrypt.compare(password, user.getPassword());

    if (!validPassword) {
        throw new Error('Invalid password');
    }
    const token = generateSWTtoken(name,role);
    return{
        token:token,
        name:user.getName(),
        email:user.getEmail(),
        role:user.getRole()
    }
}

export default {
    createUser,
    getAllUsers,
    getUserByEmail,
    authenticate
};