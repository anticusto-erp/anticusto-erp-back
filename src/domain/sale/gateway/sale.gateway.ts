import { Sale } from "../entity/Sale";

export interface SaleGateway {
    save(sale: Sale): Promise<void>;
    list(): Promise<Sale[]>;
    finOne(id: string): Promise<Sale | null>;
}