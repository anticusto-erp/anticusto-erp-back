import {Supply} from "../entity/supply";

export interface SupplyGateway {
    save(supply: Supply): Promise<void>;
    list(): Promise<Supply[]>;

    findNifSupply(nif: string): Promise<Supply | null>;
}