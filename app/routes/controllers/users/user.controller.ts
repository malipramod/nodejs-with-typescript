import express = require('express');
import { UserSchema } from '../../../db/schema/user.schema';
import * as mongoose from 'mongoose';
import * as appConstants from '../../../config/app.config';
import { PostCommentSchema } from '../../../db/schema/post-comment.schema';

const user = express.Router();

user.get('/', (req, res) => {
    res.send('welcome');
});

user.get('/getUser/:userId', (req, res) => {
    let userId = req.params.userId;
    if (!userId)
        return res.status(404).json({ "data": 'User Id is missing' });

    const User = UserSchema.getUserSchema();
    mongoose.connect(`${appConstants.dbURL}${userId}`, { useNewUrlParser: true }, err => {
        if (err) throw err;

        User.find({}, (err, data) => {
            if (err) return res.status(500).json({ err });
            res.status(200).json({ data })
        });
    });
});

user.get('/getPost/:userId', (req, res) => {
    let userId = req.params.userId;
    if (!userId)
        return res.status(404).json({ "data": 'User Id is missing' });

    const PostComment = PostCommentSchema.getPostCommentSchema();
    mongoose.connect(`${appConstants.dbURL}${userId}`, { useNewUrlParser: true }, err => {
        if (err) throw err;

        PostComment.find({ userId: userId }, (err, data) => {
            if (err) return res.status(500).json({ err });
            res.status(200).json({ data })
        });
    });
});

user.put('/updateAvatar/:userId', (req, res) => {
    let userId = req.params.userId;
    let body = req.body;
    if (!userId)
        return res.status(404).json({ "err": 'User Id is missing' });

    if (Object.entries(body).length === 0 && body.constructor === Object)
        return res.status(500).json({ "err": 'Body is missing' });

    const User = UserSchema.getUserSchema();
    mongoose.connect(`${appConstants.dbURL}${userId}`, { useNewUrlParser: true }, err => {
        if (err) throw err;

        let conditions = { id: parseInt(userId) };
        User.update(conditions, body, (err, data) => {
            if (err) res.status(500).json({ err });
            res.status(200).json({ data });
        })
    });
});

module.exports = user;
