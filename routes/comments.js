import { Router } from 'express';
import { Types } from 'mongoose';
import SchemaIndex from '../schemas/index.js';
const router = Router();

//댓글 생성
router.post('/posts/:_postId/comments', (req, res) => {
    const objectId = new Types.ObjectId();
    const commentId = objectId.toString();
    const createdAt = new Date();
    const user = req.body.user;
    const password = req.body.password;
    const content = req.body.content;
    const postId = req.params._postId;

    if(!content){
        res.status(400).json({
            message: '댓글 내용을 입력해주세요.'})
    }

    const comment = new SchemaIndex.Comment({
        commentId : commentId,
        postId : postId,
        user: user,
        password: password,
        content: content,
        createdAt : createdAt
    });

    comment
    .save()
    .then(()=>{
        res.status(201).json({
            message: '댓글을 생성하였습니다.'
        })
    })
    .catch((err)=>{
        console.log(err);
        res.status(400).json({
            message: '데이터 형식이 올바르지 않습니다'
        })
    });

})

//댓글 목록 조회
router.get('/posts/:_postId/comments', (req, res) => {
    const postId = req.params._postId;
    if(!postId){
        res.status(400).json({
            message: '데이터 형식이 올바르지 않습니다.'})
    }
    
    SchemaIndex.Comment.find({postId : postId}).sort({createdAt: -1})
    .then((comments)=>{
        comments = comments.map((comment)=>{
            return {
                commentId: comment.commentId,
                user : comment.user,
                content : comment.content,
                createdAt : comment.createdAt,
            }
        });

    res.status(200).json({
            data : comments
        })
    }).catch((err)=>{
        res.status(400).json({
            message: '댓글 목록 조회에 실패하였습니다'
        })
    })
})

//댓글 수정
router.put('/posts/:_postId/comments/:_commentId', (req, res) => {
    const commentId = req.params._commentId;
    const postId = req.params._postId;
    const password = req.body.password;
    const updateContent = req.body.content;

    if(!updateContent){
        res.status(400).json({
            message: '댓글 내용을 입력해주세요'
        })
    }else if(!commentId || !postId || !password){
        res.status(400).json({
            message: '데이터 형식이 올바르지 않습니다'
        })
    }

    SchemaIndex.Comment.findOne({commentId : commentId})
    .then((comment)=>{
        if(password ===comment.password){
            comment.content = updateContent; 
        }
        return comment.save();
    })
    .then(()=>{
        res.status(200).json({
            message: '댓글을 수정하였습니다'
    })
})
.catch((err)=>{
    res.status(400).json({
        message: '댓글 조회에 실패하였습니다.'
    })
})

}); 

//댓글 삭제
router.delete('/posts/:_postId/comments/:_commentId', (req, res) =>{
    const commentId = req.params._commentId;
    const postId = req.params._postId;
    const password = req.body.password;
    if(!commentId ||!postId ||!password){
        res.status(400).json({
            message: '데이터 형식이 올바르지 않습니다'
        })
    }

    SchemaIndex.Comment.findOneAndRemove({commentId : commentId})
    .then(()=>{
        res.status(200).json({
            message: '댓글을 삭제하였습니다'
        })
    })
    .catch((err)=>{
        res.status(400).json({
            message: '댓글 조회에 실패하였습니다.'
    })
    })
})


export default router;