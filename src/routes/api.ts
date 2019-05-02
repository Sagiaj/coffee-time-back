import express from 'express';
import AuthUtilities from '../utilities/auth';
const router = express.Router();

router.use(AuthUtilities.verifyToken);
router.get('/', async (req, res) => {
    try {
        return res.send("Success");
    } catch (err) {
        console.log(`Errored in Index. Error: ${err}`);
        let errObject = {
            responseCode: 500,
            responseMessage: err
        };

        return res.status(500).send(errObject);
    }
});

export default router;
