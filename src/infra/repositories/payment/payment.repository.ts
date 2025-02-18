import { Payment } from "../../../domain/payment/entity/payment";
import { PaymentGateway } from "../../../domain/payment/gateway/payment.gateway";
import { PoolConnection } from "../../database/Database.connection";

export class PaymentRepository implements PaymentGateway{

    private pool;

    public constructor(){
        this.pool = PoolConnection.create();
    }

    public static create(){
        return new PaymentRepository();
    }

    public async proccessPayment(payment: Payment): Promise<void> {

        await this.pool.execute("insert into caixa (id, id_venda, valor) values (?, ?, ?)", [payment.id, payment.id_sale, payment.price]);

    }

    public async findOne(id: string): Promise<Payment | null> {
        const [rows] = await this.pool.execute("select * from caixa where id_venda = ?", [id]);

        return rows.length > 0 ? rows[0] as Payment : null
    }

    public async list(): Promise<Payment[]> {
        const [rows] = await this.pool.execute("select * from caixa order by created_at");

        return rows[0] as Payment[]
    }

    public async findOneByIdSale(id_sale: string): Promise<Payment | null> {
        const [rows] = await this.pool.execute("select * from caixa where id_venda = ?", [id_sale]);

        return rows.length > 0 ? rows[0] as Payment : null
    }

}
