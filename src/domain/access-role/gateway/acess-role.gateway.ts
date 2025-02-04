import { AcessRole } from "../entity/acess-role";

export interface AcessRoleGateway {
    save(acessRole: AcessRole): Promise<void>;
}