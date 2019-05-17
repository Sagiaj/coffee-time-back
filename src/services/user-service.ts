import Users from "../models/users";
import User from "../api-models/user";

class UserService {
    static async createUser({ username, email, password, buddies }: any): Promise<User> {
        try {
            let dbUser = await Users.create({ username, email, password });
            await dbUser.addBuddy(buddies.map((buddy: any) => buddy.id));
            dbUser.buddies = User.parseToUsersList(buddies);
            let user = User.parseFromDbObject(dbUser);
            return user;
        } catch (err) {
            console.log(`Errored in UserService/createUser. Error: ${err}`);
            return Promise.reject(err);
        }
    }

    static async findUserById({ userId }: any): Promise<User> {
        try {
            let user = await Users.findOne({
                where: { id: userId }
            });
            let parsedUser = User.parseFromDbObject(user);
            return parsedUser;
        } catch (err) {
            console.log(`Errored in UserService/findUserById. error: ${err}`);;
            return Promise.reject(err);
        }
    }

    static async findUserWithBuddies({ username, password }: any): Promise<User> {
        try {
            let dbResult = await Users.findOne({
                where: { username, password },
                include: [{
                    model: Users,
                    as: `Buddies`
                }]
            });
            let parsedUser = User.parseFromDbObject(dbResult);
            return parsedUser;
        } catch (err) {
            console.log(`Errored in UserService/findUserWithBuddies: ${err}`);
            return Promise.reject(err);
        }
    }

    static async findUser({ username, password }: any): Promise<User> {
        try {
            let dbUser = await Users.findOne({
                were: { username, password }
            });
            let user = User.parseFromDbObject(dbUser);
            return user;
        } catch (err) {
            console.log(`Errored in UserService/findUser: Error: ${err}`);
            return Promise.reject(err);
        }
    }

    static async getUserBuddies(user: User): Promise<Array<User>> {
        try {
            let results = await Users.findOne({
                include:[{
                    model: Users,
                    as: 'Buddies'
                }],
                where: {id: user.id}
            });
            let buddies: Array<User> = User.parseToUsersList(results.Buddies);
            return buddies;
        } catch (err) {
            console.log(`Errored in UserService/getUserBuddies`);
            return Promise.reject(err);
        }
    }

    static async associateBuddies(user: any, buddies: Array<any>): Promise<User> {
        try {
            let objectifiedBuddies = buddies.map(buddy => {id: buddy.id});
            await user.addBuddy(buddies);
            return user;
        } catch (err) {
            console.log(`Could not associate buddies: ${buddies}`);
            return Promise.reject(err);
        }
    }
}

export default UserService;