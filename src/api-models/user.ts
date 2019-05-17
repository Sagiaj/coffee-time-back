class User {
    isLoggedIn: boolean = true;
    id: number = 0;
    username: string = '';
    email: string = '';
    password: string = '';
    buddies: Array<User> = [];

    static getStrippedUserDetails(user: any): User {
        let strippedUser = new User();
        strippedUser.isLoggedIn = true;
        strippedUser.id = user.id || 0;
        strippedUser.username = user.username || '';
        strippedUser.email = user.email || '';
        strippedUser.password = user.password || '';

        return strippedUser;
    }

    static parseFromDbObject(db_user_obj: any): User {
        let user = User.getStrippedUserDetails(db_user_obj);
        user.buddies = db_user_obj.buddies || [];
        
        return user;
    }

    static parseToUsersList(users: Array<any>): Array<User> {
        try {
            let userArr: Array<User> = users.map(user => User.parseFromDbObject(user))
            return userArr;
        } catch (err) {
            console.log(`Errored in parseToUsersList. Could not parse users: ${err}`);
            throw err;
        }
    }
}

export default User;
