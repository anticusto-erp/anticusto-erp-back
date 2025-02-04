import { User } from "../../domain/user/entity/user";
import { UserGateway } from "../../domain/user/gateway/user.gateway";
import { Usecase } from "../use-case";

export type UserInputDTO = void;

export type UserOutputDTO = {
    
    user: {
        id: string;
        username: string;
        password?: string;
        
        id_employer: string;
        id_access_role: string;

    }
    
}

export class ListUserUsecase implements Usecase<UserInputDTO, UserOutputDTO>{

    public constructor(private readonly userGateway: UserGateway){}

    public static create(userGateway: UserGateway){
        return new ListUserUsecase(userGateway);
    }

    public async execute(): Promise<any> {
        const aUser = await this.userGateway.list();

        console.log(aUser);


        const output = this.present(aUser);

        return output;
    }

    private present(input: User[]): Promise<any>{

        const result = Promise.all(input.map( async (input) => {

            const idEmployer = JSON.stringify(input.id_funcionario);
            const parsedIdEmployer = idEmployer && JSON.parse(idEmployer)
            
            const idRole = JSON.stringify(input.id_nivel_de_acesso);
            const parsedIdRole = idRole && JSON.parse(idRole)
            
            const aEmployer = await this.userGateway.findEmployer(parsedIdEmployer);
            const aRole = await this.userGateway.findAccessRole(parsedIdRole);

            return {
                id: input.id,
                username: input.nome_de_usuario,
                id_employer: input.id_funcionario,
                id_access_role: input.id_nivel_de_acesso,
                employer: aEmployer,
                access_role: aRole
            }
        }));

        return result;
    }

}
