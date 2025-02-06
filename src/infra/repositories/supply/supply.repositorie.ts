import { SupplyGateway } from "../../../domain/supply/gateway/supply.gateway";
import { PoolConnection } from "../../database/Database.connection";
import { Supply } from "../../../domain/supply/entity/supply";

export class SupplyRepository implements SupplyGateway {

    private pool;

    public constructor(){
        this.pool = PoolConnection.create();
    }

    public static create(){
        return new SupplyRepository();
    }

    public async save(supply: Supply): Promise<void> {
        await this.pool.execute("inserto into funcionario (id, nome, telefone, nif) values (?, ?, ?, ?)", [supply.id, supply.nome, supply.telefone, supply.nif]);
    }


    public async findNifSupply(nif: string): Promise<Supply | null> {

        const [rows] = await this.pool.execute("select * from fornecedor where nif = ?", [nif]);

        return rows.length > 0 ? rows[0] as Supply : null
        
    }

}
