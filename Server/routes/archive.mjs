import Router from 'express';
const router = Router();
import { posts } from './common.mjs';
import Post from '../models/post';
import User from '../models/user';

// const config = require('../config');


router.get('/', (req, res) => posts(req, res));
router.get('/archive/:page', (req, res) => posts(req, res));
router.get('/posts/:postName', async (req, res, next) => {
    const url = req.params.postName.trim().replace(/ +(?= )/g, '');
    const userId = req.session.userId;
    const userLogin = req.session.userLogin;
    // console.log(`RECEIVED URI-PARAMS:::►`, req.params);

    if (!url) {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    } else {
        try {
            const post = await Post.findOne({
                url
            }).populate('author');

            if (!post) {
                const err = new Error('Not Found');
                err.status = 404;
                next(err);
            } else {
                res.json({
                    resultCode: 101,
                    post: [post],
                    user: {
                        id: userId,
                        login: userLogin
                    }
                });
            }
        } catch (error) {
            console.error(error);
        }
    }
});


export default router;