export type LoginProps = {
    id?: string;
    telephone: string;
    password: string;
    id_employer: string
}

export class Login{

    public constructor(private props: LoginProps){}

    public static async create(telephone: string, password: string, id_employer: string){
        return new Login({
            telephone,
            password,
            id_employer
        })
    }

    public get id(){
        return this.props.id;
    }

    public get telephone(){
        return this.props.telephone;
    }

    public get password(){
        return this.props.password;
    }

    public get id_employer(){
        return this.props.id_employer;
    }

}