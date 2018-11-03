class ToDo {
    _id: string;
    title: string;
    desc: string;
    idList: string;
    createdAt: Date;
    modifiedAt: Date;
    status: boolean;
    user: string;
    files: Array<string>;
    filesOriginal: Array<Object>;

    constructor(){
        this.title = "";
        this.desc = "";
        this.createdAt = new Date();
        this.modifiedAt = new Date();
        this.status = false;
        this.idList = "";
        this.user = "poney";
        this.files = [];
    }
}

export default ToDo;
