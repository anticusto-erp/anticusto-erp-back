import { Store } from "../../store/entity/store";
import { Employer } from "../entity/employer";

export interface EmployerGateway {
    save(employer: Employer): Promise<void>;
    list(): Promise<Employer[]>;
    findById(bi: string): Promise<Employer | null>
    update(employer: Employer): Promise<void>;
    delete(id: string): Promise<void>;

    findByBi(bi: string): Promise<Employer | null>
    findByEmail(email: String): Promise<Employer | null>
    findByTelephone(telephone: string): Promise<Employer | null>
    findStore(id: string): Promise<Store | null>;
}