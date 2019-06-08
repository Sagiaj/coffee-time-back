import express from 'express';
import AuthUtilities from '../utilities/auth';
import UserService from '../services/user-service'
const router = express.Router();

router.use(AuthUtilities.verifyToken);
router.get('/', async (req, res) => {
    try {
        return res.send("Success");
    } catch (err) {
        console.log(`Errored in Index. Error: ${err}`);

        return res.status(500).send(err);
    }
});

router.post('/users/:userId/buddies', async (req, res) => {
    try {
        let { buddies, userId }: {userId: number, buddies: Array<object>} =  {... req.body, ...req.params};
        let updatedUser = await UserService.associateBuddies(userId, buddies);
        return res.send({ user: updatedUser });
    } catch(err) {
        console.log(`Errored in saving buddies. Error: ${err}`);
        return res.status(500).send(err);
    }
});

router.get('/users/search/:expression', async (req, res) => {
    try {
        console.log('im herereee')
        let like = req.param('expression', '');
        let buddies = await UserService.findUsersLike(like);
        return res.send({ buddies });
    } catch (err) {
        console.log(`Errored in searching users like. Error: ${err}`);
        return res.status(500).send(err);
    }
});
export default router;
