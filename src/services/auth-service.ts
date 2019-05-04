import User from "../api-models/user";
import Users from "../models/users";
import JwtService from './jwt-service';

class AuthService {
    static async login({ username, password }: any): Promise<any> {
        try {
            let foundUser = await Users.findOne({ where: { username, password }});
            if (!foundUser) {
                return Promise.reject(`Could not find user ${username}`);
            }
            let user = User.createFromDBObject(foundUser);
            let token: string = await JwtService.sign(user);
            return { user, token };
        } catch (err) {
            console.log(`Errored in AuthService/login: ${err}`)
            return Promise.reject(err);
        }
    }

    static async register({username, email, password}: any): Promise<any> {
        try {
            let newUser = await Users.create({ username, email, password });
            let user: User = User.createFromDBObject(newUser);
            let token: string = await JwtService.sign(user);
            return { user, token };
        } catch (err) {
            console.log(`Errored in AuthService/register: ${err}`);
            return Promise.reject(err);
        }
    }

    static async getVerifiedUserByToken(token: string): Promise<User> {
        let verifiedUser = await JwtService.getVerifiedUserByToken(token);
        let user: User = User.createFromDBObject(verifiedUser);
        return user;
    }
}

export default AuthService;
