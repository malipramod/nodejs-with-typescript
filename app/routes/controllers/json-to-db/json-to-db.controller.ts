import express = require('express');
import axios from 'axios';
import * as appConstants from '../../../config/app.config';
import { JSON2DBHelper } from './json-to-db.helper';
import { PostModel, CommentModel } from './json-to-db-post-comment.mode';
const json2db = express.Router();

json2db.get('/', (req, res) => res.status(200).send("Welcome to JSON to DB API"));

json2db.post('/storeusers', (req, res) => {
    axios.get(`${appConstants.jsonPlaceHolderURL}users`).then(response => {
        let json2 = new JSON2DBHelper();
        json2.createUserDB(response.data);
        res.status(201).send("User database(s) and collection(s) are created");
    }).catch(error => {
        res.status(404).send('Unable to get users');
    });
});

json2db.post('/storepostcomments', (req, res) => {
    let postsPromise = axios.get(`${appConstants.jsonPlaceHolderURL}posts`);
    let commentsPromise = axios.get(`${appConstants.jsonPlaceHolderURL}comments`);

    Promise.all([postsPromise, commentsPromise]).then(resp => {
        let posts: Array<PostModel> = resp[0].data;
        let comments: Array<CommentModel> = resp[1].data;

        let json2 = new JSON2DBHelper();
        json2.createPostComments(posts, comments);
        res.status(201).send('Success');
    }).catch(err => {
        res.status(404).send('Unable to get posts or comments or both');
    });
});

module.exports = json2db;