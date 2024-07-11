const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Blog = require('../model/blog');
const checkAdmin = require('../middleware/checkAdmin');

// post bblog by admin
router.post('/', async (req, res) => {
    const newBlog = new Blog({
        _id: new mongoose.Types.ObjectId,
        title: req.body.title,
        category: req.body.category,
        description: req.body.description,
        imageUrl: req.body.imageUrl
    })
    newBlog.save()
        .then(result => {
            res.status(200).json({
                new_blog: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

// get all blog || GET
router.get('/', (req, res) => {
    Blog.find()
        .select('_id title category description imageUrl')
        .then(result => {
            res.status(200).json({
                blogs: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

// get blog by ID || GET
router.get('/:id', (req, res) => {
    // const { id } = req.params;
    Blog.find({ _id: req.params.id })
        .select('_id title category description imageUrl')
        .then(result => {
            res.status(200).json({
                blog: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

// get blog by category || GET
router.get('/category/:category', (req, res) => {
    // const { id } = req.params;
    Blog.find({ category: req.params.category })
        .select('_id title category description imageUrl')
        .then(result => {
            res.status(200).json({
                blog: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

// deleted data || DELETE
router.delete('/:id', (req, res) => {
    // const { id } = req.params;
    Blog.deleteOne({ _id: req.params.id })
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

// update the blog || PUT
router.put('/:id', (req, res) => {
    Blog.updateOne({ _id: req.params.id }, req.body)
        .then(result => {
            res.status(200).json({
                updatedData: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })

})

// count all blogs
router.get('/get/count', (req, res) => {
    Blog.find().countDocuments()
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