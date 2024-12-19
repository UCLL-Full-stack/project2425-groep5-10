import { User as UserPrisma } from '@prisma/client';
import { Role } from '../types';

export class User {
    readonly id?: number;
    readonly name: string;
    readonly email: string;
    readonly password: string;
    readonly role: Role;

    constructor(user: { name: string; email: string; password: string, role: Role }) {
        this.validate(user);
        
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
    }

    validate(user: { name: string; email: string; password: string, role:Role }): void {
        if (!user.name) {
            throw new Error('User name is required');
        }
        if (!user.email) {
            throw new Error('User email is required');
        }
        if (!user.password) {
            throw new Error('User password is required');
        }
        if (!user.role) {
            throw new Error('User role is required');
        }
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPassword(): string {
        return this.password;
    }

    public getRole(): Role {
        return this.role;
    }

    equals(user: User): boolean {
        return (
            this.name === user.name && this.email === user.email && this.password === user.password && this.role === user.role
        );
    }

    static from({ id, name, email, password, role }: UserPrisma): User {
        return new User({
            name,
            email,
            password,
            role: role as Role,
        });
    }
}
