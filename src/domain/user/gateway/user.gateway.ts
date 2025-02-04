import { User } from "../entity/user";

export interface UserGateway {
    save(user: User): Promise<void>;
    findOne(id: string): Promise<User| null>;
}