class ListTodo{
    _id: string;
    title: string;
    desc: string;
    createdAt: Date;
    user: string;
    modifiedAt: Date;
    status: boolean;

    constructor(){
        this.title = "";
        this.createdAt = new Date();
        this.modifiedAt = new Date();
        this.user = "poney";
        this.status = false;
    }
}

export default ListTodo;
