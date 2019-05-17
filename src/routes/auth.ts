import express from 'express';
import AuthService from '../services/auth-service';
import AuthUtilities from '../utilities/auth';
const router = express.Router();

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
        let { user, token } = await AuthService.register(req.body);
        return res.send({ user, token });
    } catch (err) {
        console.log(`Errored in register: ${err}`);
        return res.status(500).send(err);
    }
});

router.get('/getVerifiedUserByToken', AuthUtilities.verifyToken, async (req, res) => {
    try {
        let token: string = req.headers.jwtToken || '';
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
