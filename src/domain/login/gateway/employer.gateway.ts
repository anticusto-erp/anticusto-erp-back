import { Employer } from "../entity/employer";

export interface EmployerGateway {
    save(employer: Employer): Promise<void>;
    findByBi(bi: string): Promise<Employer | null>
    findById(bi: string): Promise<Employer | null>
    findByEmail(email: String): Promise<Employer | null>
    findByTelephone(telephone: string): Promise<Employer | null>
}