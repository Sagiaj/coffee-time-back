import Users from '../models/users';
import jwt from 'jsonwebtoken';
import express from 'express';
const router = express.Router();
const { SECRET_KEY } = process.env;

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        let user = await Users.findOne({ where: { username, password }});
        if (user) {
            console.log('found user')
            await jwt.sign(user.dataValues, SECRET_KEY, (err: any, token: string) => {
                if (err) {
                    res.status(500).send(err);
                }
                res.send(token);
            });
        } else {
            res.status(401).send("User not found!")
        }
    } catch (err) {
        console.log(`Errored in Login. Error: ${err}`);
        let errObject = {
            responseCode: 401,
            responseMessage: err
        }

        return res.status(errObject.responseCode).send(errObject);
    }
});

router.post('/register', async (req, res) => {
    try {
        const { email, username, password } = req.body;
        let user = await Users.create({
            email,
            username,
            password
        });
        let jwtToken = jwt.sign(user.dataValues, SECRET_KEY, (err: any, token: string) => {
            if (err) {
                res.status(500).send(err);
            }
            res.send(token);
        })
    } catch (err) {
        let errObject = {};
        return res.status(500).send(err);
    }
});

export default router;
