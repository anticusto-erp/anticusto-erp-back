import { Employer } from "../entity/create";

export interface EmployerGateway {
    save(employer: Employer): Promise<void>;
}