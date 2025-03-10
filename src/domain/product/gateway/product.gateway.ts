import {Product} from "../entity/product";

export interface ProductGateway {
    save(product: Product): Promise<void>;
    list(): Promise<Product[]>;
    update(product: Product): Promise<void>;
    findOne(id?: string): Promise<Product | null>;
    delete(id: string): Promise<void>;
}
