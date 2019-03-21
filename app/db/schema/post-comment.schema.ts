import * as mongoose from 'mongoose';
const validator = require('validator');

export class PostCommentSchema {
    
    static postCommentSchema = new mongoose.Schema({
        userId: {
            type: Number,
            required: true,
            unique: false
        },
        id: {
            type: Number,
            required: true,
            unique: true
        },
        title: {
            type: String,
            required: false,
            unique: false
        },
        body: {
            type: String,
            required: false,
            unique: false
        },
        comments: [{
            id: {
                type: Number,
                required: true,
                unique: true
            },
            postId: {
                type: Number,
                required: true,
                unique: false
            },
            name: {
                type: String,
                required: true,
                unique: false
            },
            email: {
                type: String,
                required: false,
                unique: false,
                lowercase: true,
                validate: (value: string) => {
                    return validator.isEmail(value)
                }
            },
            body: {
                type: String,
                required: true,
                unique: false
            }
        }]
    });

    static getPostCommentSchema(){
        return mongoose.model('Posts',this.postCommentSchema);
    }
}

