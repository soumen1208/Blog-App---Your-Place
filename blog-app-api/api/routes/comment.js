const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Comment = require('../model/comment');
const checkAuth = require('../middleware/checkAuth');

// post new comment
router.post('/', checkAuth, async (req, res) => {
    const newComment = new Comment({
        _id: new mongoose.Types.ObjectId,
        email: req.body.email,
        commentText: req.body.commentText,
        blogId: req.body.blogId
    })
    newComment.save()
        .then(result => {
            res.status(200).json({
                new_comment: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

// get all comment || GET
router.get('/', (req, res) => {
    Comment.find()
        .select('_id email commentText blogId')
        .then(result => {
            res.status(200).json({
                comments: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

// delete comment by id || DELETE
router.delete('/:id', (req, res) => {
    // const { id } = req.params;
    Comment.deleteOne({ _id: req.params.id })
        // .select('_id title description imageUrl')
        .then(result => {
            res.status(200).json({
                deleteData: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})


// count all comment by 
router.get('/get/count/:blogId', (req, res) => {
    Comment.find({ blogId: req.params.blogId }).countDocuments()
        .then(result => {
            res.status(200).json({
                total: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})


module.exports = router;




// // update the category || PUT
// router.put('/:id', (req, res) => {
//     Category.updateOne({ _id: req.params.id }, req.body)
//         .then(result => {
//             res.status(200).json({
//                 updatedData: result
//             })
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             })
//         })

// })