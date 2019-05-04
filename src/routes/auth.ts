import Users from '../models/users';
import jwt from 'jsonwebtoken';
import express from 'express';
import AuthService from '../services/auth-service';
import JwtService from '../services/jwt-service';
const router = express.Router();
const { SECRET_KEY } = process.env;

router.post('/login', async (req, res) => {
    try {
        let { user, token } = await AuthService.login(req.body);
        return res.send({ user, token });
    } catch (err) {
        console.log(`Errored in Login. Error: ${err}`);
        return res.status(401).send(err);
    }
});

router.post('/register', async (req, res) => {
    try {
        let user = await AuthService.register(req.body);
        let token: string = await JwtService.sign(user);
        return res.send({ user, token });
    } catch (err) {
        console.log('LOL error!', err)
        return res.status(500).send(err);
    }
});

router.get('/getVerifiedUserByToken/:token', async (req, res) => {
    try {
        let token: string = req.param('token', '');
        if (!token) {
            console.log(`Errored in getVerifiedUserByToken - empty token`);
            return res.status(403).send("Token empty - user not found.");
        }
        let user = await AuthService.getVerifiedUserByToken(token);
        return res.send({ user });
    } catch (err) {
        console.log(`Errored in getVerifiedUserByToken: ${err}`);
        return res.status(500).send(err);
    }
})

export default router;
