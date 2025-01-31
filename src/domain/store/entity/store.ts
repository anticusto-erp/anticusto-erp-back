export type StoreProps = {
    id: string;
    name_store: string;
    address: string;
    contact: string;
    tenant_key: string;
}

export class Store {

    private constructor(private prop: StoreProps){}

    public static create(name_store: string, address: string, contact: string){
        return new Store({
            id: crypto.randomUUID().toString(),
            name_store,
            address,
            contact,
            tenant_key: crypto.randomUUID().toString()
        });
    }

    public static with(props: StoreProps){
        return new Store(props);
    }

    public get id(){
        return this.prop.id;
    }

    public get name_store(){
        return this.prop.name_store;
    }

    public get address(){
        return this.prop.address;
    }

    public get contact(){
        return this.prop.contact;
    }

    public get tenant_key(){
        return this.prop.tenant_key;
    }


}