import { Employer } from "../../../domain/employer/entity/employer";
import { EmployerGateway } from "../../../domain/employer/gateway/employer.gateway";
import {PoolConnection} from "../../database/Database.connection";

export class EmployerRepository implements EmployerGateway {
    
    private pool;

    public constructor(){
        this.pool = PoolConnection.create();
    }

    public static create(){
        return new EmployerRepository();
    }

    public async save(employer: Employer): Promise<void> {

        await this.pool.execute("insert into funcionario (id, id_loja, primeiro_nome, ultimo_nome, email, telefone, bi) values (?,?,?,?,?,?,?)", [employer.id, employer.id_store, employer.firstName, employer.lastName, employer.email, employer.telephone, employer.bi]);

    }



}
