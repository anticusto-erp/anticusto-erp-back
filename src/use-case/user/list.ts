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
        const output = this.present(aUser);

        return output;
    }

    private present(input: User[]){
        return input.map((input) => {
            return {
                id: input.id,
                username: input.nome_de_usuario,
                id_employer: input.id_funcionario,
                id_access_role: input.id_nivel_de_acesso
            }
        })
    }

}
