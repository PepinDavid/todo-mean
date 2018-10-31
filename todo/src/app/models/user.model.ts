class User {
    _id: string;
    username: string;
    email: string;
    name: string;
    surname: string;
    admin: boolean;

    constructor(){
        this.username = "";
        this.email = "";
        this.name = "";
        this.surname = "";
        this.admin = false;
    }
}

export default User;
