export type StoreProps = {
    id: string;
    nome: string;
    endereco: string;
    contacto: string;
    tenant_key: string;
    created_at?: Date,
}

export class Store {

    private constructor(private prop: StoreProps){}

    public static create(nome: string, endereco: string, contacto: string){
        return new Store({
            id: crypto.randomUUID().toString(),
            nome,
            endereco,
            contacto,
            tenant_key: crypto.randomUUID().toString()
        });
    }

    public static with(props: StoreProps){
        return new Store(props);
    }

    public get id(){
        return this.prop.id;
    }

    public get nome(){
        return this.prop.nome;
    }

    public get endereco(){
        return this.prop.endereco;
    }

    public get contacto(){
        return this.prop.contacto;
    }

    public get tenant_key(){
        return this.prop.tenant_key;
    }

    public get created_at(){
        return this.prop.created_at;
    }


}