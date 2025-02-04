export type AcessRoleProps = {
    id: string,
    access_role: string,
}

export class AcessRole {

    public constructor(private props: AcessRoleProps){}

    public static create(access_role: string, id?: string){
        return new AcessRole({
            id: id ?? crypto.randomUUID().toString(),
            access_role
        })
    }

    public with(prop: AcessRoleProps){
        return new AcessRole(prop);
    }

    public get id(){
        return this.props.id
    }

    public get access_role(){
        return this.props.access_role
    }

}