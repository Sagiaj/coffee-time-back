import jwt from 'jsonwebtoken';
const { SECRET_KEY } = process.env;

class JwtService {
    static async sign(user: any): Promise<string> {
        try {
            let jsonUser = JSON.parse(JSON.stringify(user));
            let token: string = await jwt.sign(jsonUser, SECRET_KEY);
            return token;
        } catch (err) {
            console.log(`Errored in JwtService/sign: ${err}`)
            return Promise.reject(err);
        }
    }

    static async getVerifiedUserByToken(token: string): Promise<any> {
        let jsonUser = await jwt.verify(token, SECRET_KEY);
        return jsonUser.user;
    }
}

export default JwtService;
