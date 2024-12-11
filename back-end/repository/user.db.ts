import { User } from '../model/user';

const users: User[] = [];

const createUser = ({ name, email, password }: User) => {
    const user = new User({
        name: name,
        email: email,
        password: password,
    });

    users.push(user);
    return user;
};

const getAllUsers = (): User[] => users;

const getUserByEmail = (email: string) => {
    return users.find((user) => user.getEmail() === email);
};

export default {
    createUser,
    getAllUsers,
    getUserByEmail,
};