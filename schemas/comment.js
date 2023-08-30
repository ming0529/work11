import { Schema, model } from 'mongoose';

const commentSchema = new Schema({
    commentId : {
        type : String,
        required: true
    },
    postId : {
        type : String,
        required: true
    },
    user : {
        type : String,
        required: true
    },
    password : {
        type : Schema.Types.Mixed,
        required: true
    },
    content : {
        type : String,
        required: true
    },
    createdAt : {
        type : Date,
        required: true
    }


});

export default model('Comment', commentSchema);

