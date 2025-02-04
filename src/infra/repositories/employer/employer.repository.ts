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

    public async list(): Promise<Employer[]> {
        const [rows] = await this.pool.execute("select * from funcionario");

        return rows as Employer[];
    }

    public async findById(id: string): Promise<Employer | null> {
        const [rows] = await this.pool.execute("select * from funcionario where id = ?", [id]);

        return rows.length > 0 ? rows[0] as Employer : null;
    }

    public async findByBi(bi: string): Promise<Employer | null> {
        const [rows] = await this.pool.execute("select * from funcionario where bi = ?", [bi]);

        return rows.length > 0 ? rows[0] as Employer : null;
    }

    public async findByEmail(email: String): Promise<Employer | null> {
        
        const [rows] = await this.pool.execute("select * from funcionario where email = ?", [email]);

        return rows.length > 0 ? rows[0] as Employer : null;

    }

    public async findByTelephone(telephone: string): Promise<Employer | null> {
        const [rows] = await this.pool.execute("select * from funcionario where telefone = ?", [telephone]);

        return rows.length > 0 ? rows[0] as Employer : null;
    }



}
