import { AcessRole } from "../entity/acess-role";

export interface AcessRoleGateway {
    save(acessRole: AcessRole): Promise<void>;
    list(): Promise<AcessRole[]>;

    findByName(nivel: string): Promise<AcessRole | null>;
    findById(id: string): Promise<AcessRole | null>;
}