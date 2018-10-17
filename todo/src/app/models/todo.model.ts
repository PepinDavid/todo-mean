class ToDo {
    _id: string;
    title: string;
    desc: string;
    listId: string;
    createdAt: Date;
    modifiedAt: Date;
    status: boolean;
    user: string;

    constructor(){
        this.title = "";
        this.desc = "";
        this.createdAt = new Date();
        this.modifiedAt = new Date();
        this.status = false;
        this.user = "poney";
    }
}

export default ToDo;
