import * as mongoose from 'mongoose';
const validator = require('validator');

export class UserSchema {
   static userSchema = new mongoose.Schema({
        id: {
            type: Number,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true,
            unique: false
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            validate: (value: string) => {
                return validator.isEmail(value)
            }
        },
        address: {
            street: {
                type: String,
                required: false,
                unique: false
            },
            suite: {
                type: String,
                required: false,
                unique: false
            },
            city: {
                type: String,
                required: false,
                unique: false
            },
            zipcode: {
                type: String,
                required: false,
                unique: false
            },
            geo: {
                lat: {
                    type: String,
                    required: false,
                    unique: false
                },
                lng: {
                    type: String,
                    required: false,
                    unique: false
                }
            }
        },
        phone: {
            type: String,
            required: true,
            unique: true
        },
        website: {
            type: String,
            required: false,
            unique: false
        },
        company: {
            name: {
                type: String,
                required: false,
                unique: false
            },
            catchPhrase: {
                type: String,
                required: false,
                unique: false
            },
            bs: {
                type: String,
                required: false,
                unique: false
            }
        }
    });

    static getUserSchema() {
        return mongoose.model('Users',this.userSchema);
    }
}