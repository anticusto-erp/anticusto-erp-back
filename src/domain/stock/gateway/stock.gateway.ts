import {Stock} from "../entity/stock";

export interface StockGateway {
    save(stock: Stock): Promise<void>;
}
