import {Supply} from "../entity/supply";

export interface SupplyGateway {
    save(supply: Supply): Promise<void>;

    findNifSupply(nif: string): Promise<Supply | null>;
}