import {Stock} from "../entity/stock";

export interface StockGateway {
    save(stock: Stock): Promise<void>;
    list(): Promise<Stock[]>;
    
    findOne(id: string): Promise<Stock | null>;
    findOneProduct(id: string): Promise<Stock | null>;

    reduceQuantityInStock(quantidade: number, id: string): Promise<void>;
}
