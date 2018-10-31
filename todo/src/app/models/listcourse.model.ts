class ListCourse{
    _id: string;
    title: string;
    desc: string;
    createdAt: Date;
    user: string;
    modifiedAt: Date;

    constructor(){
        this.title = "";
        this.desc = "";
        this.createdAt = new Date();
        this.modifiedAt = new Date();
        this.user = "poney";
    }
}

export default ListCourse;
