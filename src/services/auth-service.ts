import User from "../api-models/user";
import JwtService from './jwt-service';
import UserService from "./user-service";

class AuthService {
    static async login({ username, password }: any): Promise<any> {
        try {
            let foundUser = await UserService.findUserWithBuddies({ username, password });
            if (!foundUser) {
                return Promise.reject(`Could not find user ${username}`);
            }
            let user = User.parseFromDbObject(foundUser);
            let token: string = await JwtService.sign(User.getStrippedUserDetails(user));
            user.buddies = await UserService.getUserBuddies(user);
            return { user, token };
        } catch (err) {
            console.log(`Errored in AuthService/login: ${err}`);
            return Promise.reject(err);
        }
    }

    static async register({ username, email, password, buddies }: any): Promise<any> {
        try {
            let user = await UserService.createUser({ username, email, password, buddies });
            let token: string = await JwtService.sign(User.getStrippedUserDetails(user));
            return { user, token };
        } catch (err) {
            console.log(`Errored in AuthService/register: ${err}`);
            return Promise.reject(err);
        }
    }

    static async getVerifiedUserByToken(token: string): Promise<User> {
        try {
            let verifiedUser = await JwtService.getVerifiedUserByToken(token);
            let user: User = User.parseFromDbObject(verifiedUser);
            user.buddies = await UserService.getUserBuddies(user);
            return user;
        } catch (err) {
            console.log(`Errored in AuthService/getVErifiedUserByToken. error: ${err}`);
            return Promise.reject(err);
        }
    }
}

export default AuthService;
