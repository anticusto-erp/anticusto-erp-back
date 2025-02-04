import { AcessRole } from "../../access-role/entity/acess-role";
import { Employer } from "../../employer/entity/employer";
import { Store } from "../../store/entity/store";
import { User } from "../entity/user";

export interface UserGateway {
    save(user: User): Promise<void>;
    list(): Promise<User[]>;

    findOne(id: string): Promise<User| null>;
    findOneLogin(id: string): Promise<User| null>;
    findTelephoneToLogin(telephone: string): Promise<User| null>;
    findStore(id: string): Promise<Store | null>;
    findRole(id: string): Promise<AcessRole | null>;
    findEmployer(id: string): Promise<Employer | null>;
    findAccessRole(id: string): Promise<AcessRole | null>;
}