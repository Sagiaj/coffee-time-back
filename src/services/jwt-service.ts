import jwt from 'jsonwebtoken';
const { SECRET_KEY } = process.env;

class JwtService {
    static async sign(user: any): Promise<string> {
        try {
            let plainUserObject = Object.assign({}, user);
            let token: string = await jwt.sign(plainUserObject, SECRET_KEY);
            return token;
        } catch (err) {
            console.log(`Errored in JwtService/sign: ${err}`)
            return Promise.reject(err);
        }
    }

    static async getVerifiedUserByToken(token: string): Promise<any> {
        let user = await jwt.verify(token, SECRET_KEY);
        return user;
    }
}

export default JwtService;
