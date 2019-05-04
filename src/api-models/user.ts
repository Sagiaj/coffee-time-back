class User {
    isLoggedIn: boolean = true;
    id: number = 0;
    username: string = '';
    email: string = '';
    password: string = '';

    static createFromDBObject(db_user_obj: any): User {
        let user = new User();
        user.isLoggedIn = true;
        user.id = db_user_obj.id || 0;
        user.username = db_user_obj.username || '';
        user.email = db_user_obj.email || '';
        user.password = db_user_obj.password || '';
        
        return user;
    }
}

export default User;
