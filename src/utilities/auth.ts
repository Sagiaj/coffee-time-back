import jwt from 'jsonwebtoken';
const { SECRET_KEY } = process.env;

const verifyToken = (req: any, res: any, next: any): any => {
    let bearerHeader: string = req.headers['authorization'] || '';
    if (!bearerHeader) {
        return res.sendStatus(401);
    }
    let bearerToken: string = bearerHeader.split(' ')[1] || '';
    if (!bearerToken) {
        return res.sendStatus(401);
    }
    jwt.verify(bearerToken, SECRET_KEY, (err: any, authData: any) => {
        if (err) {
            res.sendStatus(403);
        } else {
            req.headers.jwtToken = bearerToken;
            next();
        }
    })
};

export default { verifyToken };
