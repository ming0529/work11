import { Router } from 'express';
const router = Router();
import { Types } from 'mongoose';
import SchemaIndex from '../schemas/index.js';

//게시글 작성 
router.post('/posts', (req, res, next) => {
    const ObjectId = new Types.ObjectId()
    const postId = ObjectId.toString();
    const createdAt = new Date();
    const user = req.body.user;
    const password = req.body.password;
    const title = req.body.title;
    const content = req.body.content;

    const post = new SchemaIndex.Post({
        postId : postId,
        createdAt : createdAt,
        user : user,
        password : password,
        title : title,
        content : content
    });

    post
    .save()
    .then(()=>{
        res.status(201).json({
            message : "게시글을 생성하였습니다"
        })

    })
    .catch((err)=>{
        res.status(400).json({
            message : "데이터 형식이 올바르지 않습니다."
        })

    });
})


//게시글 조회 
router.get('/posts', (req, res, next) => {
    SchemaIndex.Post.find().sort({createdAt : -1})
    .then((posts)=>{

        posts = posts.map((post)=>{
            return {
                postId : post.postId,
                createdAt : post.createdAt,
                user : post.user,
                title : post.title,
            }
        });
        res.status(200).json({
            data : posts
        })
    })
    .catch((err)=>{
        console.log(err);
    })

})

//게시글 상세조회 
router.get('/posts/:_postId', (req, res, next) => {
    const postId = req.params._postId;
    
    SchemaIndex.Post.findOne({postId : postId})
    .then((post)=>{
        console.log('hi')
        console.log(post)
        res.status(200).json({
            data : {
                postId :post.postId,
                createdAt : post.createdAt,
                user : post.user,
                title : post.title,
                content : post.content
            }
        })
    })
    .catch((err)=>{
        res.status(400).json({
            message : "게시글 조회에 실패하였습니다"
        })
    })

})

//게시글 수정
router.put('/posts/:_postId', (req, res, next) => {
    const postId = req.params._postId;
    const updatedtitle = req.body.title;
    const updatedcontent = req.body.content;
    const password = req.body.password;

    if(!(postId || updatedtitle || updatedcontent || password)) {
        res.status(400).json({
            message : "데이터 형식이 올바르지 않습니다."
        })
    }

    SchemaIndex.Post.findOne({postId : postId})
    .then((post)=>{
        if(password === post.password){
            post.title = updatedtitle;
            post.content = updatedcontent;
        }
        return post.save();

    })
    .then(()=>{
        res.status(200).json({
            message : "게시글을 수정하였습니다."
        })
    })
    .catch((err)=>{
        res.status(404).json({
            message : "게시글 조회에 실패하였습니다."
        })
    })

});


//게시글 삭제 
router.delete('/posts/:_postId', (req, res, next) => {
    const postId = req.params._postId;
    const password = req.body.password;

    if(!(postId || password)) {
        res.status(400).json({
            message : "데이터 형식이 올바르지 않습니다."
        })
    }

    SchemaIndex.Post.findOneAndRemove({postId : postId})
        .then(()=>{
        res.status(200).json({
            message : "게시글을 삭제하였습니다."
             })
        })
        .catch((err)=>{
        res.status(404).json({
            message : "게시글 조회에 실패하였습니다."

         })
    });

})

export default router;