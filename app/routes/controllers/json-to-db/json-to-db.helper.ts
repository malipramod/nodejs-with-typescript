import * as mongoose from 'mongoose';

import { UserModel } from "./json-to-db-user.model";
import * as appConstants from '../../../config/app.config';
import { UserSchema } from '../../../db/schema/user.schema';
import { PostModel, CommentModel, PostCommentModel } from './json-to-db-post-comment.mode';
import { PostCommentSchema } from '../../../db/schema/post-comment.schema';


export class JSON2DBHelper {
    createUserDB(users: Array<UserModel>) {
        let User = UserSchema.getUserSchema();
        users.forEach(u => {
            mongoose.connect(`${appConstants.dbURL}${u.id}`, { useNewUrlParser: true }, err => {
                if (err) throw err;
                const user = new User(u);
                user.save((err, data) => {
                    if (err) throw err;
                });
            });
        });
    }

    createPostComments(posts: Array<PostModel>, comments: Array<CommentModel>) {
        let postCommentMap = new Map<Number, PostCommentModel>();
        const postMap = posts.reduce(
            (postMap, post) => postMap.set(post.id, post), new Map()
        );
        let postCommentModel: PostCommentModel;
        comments.map(comment => {
            //If Model doesn't have post with current postId 
            if (!postCommentMap.get(comment.postId)) {
                postCommentModel = new PostCommentModel();

                postCommentModel.id = postMap.get(comment.postId).id;
                postCommentModel.userId = postMap.get(comment.postId).userId;
                postCommentModel.title = postMap.get(comment.postId).title;
                postCommentModel.body = postMap.get(comment.postId).body;
                postCommentModel.comments.push(comment);
                postCommentMap.set(comment.postId, postCommentModel);
            } else {
                //If it's aleady having the post
                postCommentModel.comments.push(comment);
                postCommentMap.set(comment.postId, postCommentModel);
            }
        });

        this._storePostCommentToDatabase(postCommentMap)
    }

    _storePostCommentToDatabase(postCommentMap: Map<Number, PostCommentModel>) {
        let PostCOmment = PostCommentSchema.getPostCommentSchema();
        postCommentMap.forEach(pc => {
            mongoose.connect(`${appConstants.dbURL}${pc.userId}`, { useNewUrlParser: true }, err => {
                if (err) throw err;
                let posts = new PostCOmment(pc)
                posts.save((err: any) => {
                    if (err) throw err;
                });
            });
        })
    }
}