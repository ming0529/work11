import { Schema, model } from 'mongoose';

const Schema = _Schema;

const postSchema = new Schema({
    postId : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
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
    title :{
        type : String,
        required: true
    },
    content:{
        type : String,
        required: true
    }

});



export default model('Post', postSchema);

