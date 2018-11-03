class Course {
    _id: string;
    title: string;
    desc: string;
    idListCourse: string;
    createdAt: Date;
    modifiedAt: Date;
    user: string;
    files: Array<string>;
    filesOriginal: Array<Object>;

    constructor(){
        this.title = "";
        this.desc = "";
        this.createdAt = new Date();
        this.modifiedAt = new Date();
        this.idListCourse = "";
        this.user = "poney";
        this.files = [];
    }
}

export default Course;
