export type EmployerProps = {

    id: string;
    id_store: string;
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    bi: string;
    created_at?: Date;
}

export class Employer{

    public constructor(private props: EmployerProps){}

    public static create(firstName: string, lastName: string, telephone: string, email: string,bi: string, id_store: string, id?: string){
        return new Employer({
            id: id ?? crypto.randomUUID().toString(),
            firstName,
            lastName,
            telephone,
            email,
            id_store,
            bi,
        })
    }

    public with(prop: EmployerProps){
        return new Employer(prop);
    }

    public get id(){
        return this.props.id;
    }

    public get firstName(){
        return this.props.firstName;
    }

    public get lastName(){
        return this.props.lastName;
    }

    public get telephone(){
        return this.props.telephone;
    }

    public get email(){
        return this.props.email;
    }

    public get bi(){
        return this.props.bi;
    }

    public get id_store(){
        return this.props.id_store;
    }

}