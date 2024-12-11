export class User {
    readonly id?: number;
    readonly name: string;
    readonly email: string;
    readonly password: string;

    constructor(user: { name: string; email: string; password: string }) {
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
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

    equals(user: User): boolean {
        return (
            this.name === user.name && this.email === user.email && this.password === user.password
        );
    }
}
