// const express = require('express');
// const router = express.Router();
// const mongoose = require('mongoose');
// const Comment = require('../model/comment');

// // post new comment
// router.post('/', async (req, res) => {
//     const newComment = new Comment({
//         _id: new mongoose.Types.ObjectId,
//         email: req.body.email,
//         commentText: req.body.commentText
//     })
//     newComment.save()
//         .then(result => {
//             res.status(200).json({
//                 new_comment: result
//             })
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             })
//         })
// })

// // get all comment || GET
// router.get('/', (req, res) => {
//     Comment.find()
//         .select('_id email commentText')
//         .then(result => {
//             res.status(200).json({
//                 comments: result
//             })
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             })
//         })
// })

// // delete comment by id || DELETE
// router.delete('/:id', (req, res) => {
//     // const { id } = req.params;
//     Category.deleteOne({ _id: req.params.id })
//         // .select('_id title description imageUrl')
//         .then(result => {
//             res.status(200).json({
//                 deleteData: result
//             })
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             })
//         })
// })

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

// // count all categories
// router.get('/get/count', (req, res) => {
//     Category.find().countDocuments()
//         .then(result => {
//             res.status(200).json({
//                 total: result
//             })
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             })
//         })
// })


// module.exports = router;