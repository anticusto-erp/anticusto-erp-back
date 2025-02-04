import { Employer } from "../entity/employer";

export interface EmployerGateway {
    save(employer: Employer): Promise<void>;
}