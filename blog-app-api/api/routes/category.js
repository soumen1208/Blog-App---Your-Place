const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Category = require('../model/category');

// post category by admin
router.post('/', async (req, res) => {
    const newCategory = new Category({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        imageUrl: req.body.imageUrl
    })
    newCategory.save()
        .then(result => {
            res.status(200).json({
                new_category: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

// get all category || GET
router.get('/', (req, res) => {
    Category.find()
        .select('_id name imageUrl')
        .then(result => {
            res.status(200).json({
                category: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

// delete category by id || DELETE
router.delete('/:id', (req, res) => {
    // const { id } = req.params;
    Category.deleteOne({ _id: req.params.id })
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

// update the category || PUT
router.put('/:id', (req, res) => {
    Category.updateOne({ _id: req.params.id }, req.body)
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

// count all categories
router.get('/get/count', (req, res) => {
    Category.find().countDocuments()
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



// // get category by ID || GET
// router.get('/:id', (req, res) => {
//     // const { id } = req.params;
//     Category.find({ _id: req.params.id })
//         .select('_id name imageUrl')
//         .then(result => {
//             res.status(200).json({
//                 category: result
//             })
//         })
//         .catch(err => {
//             res.status(500).json({
//                 error: err
//             })
//         })
// })


// // get blog by category || GET
// router.get('/category/:category', (req, res) => {
//     // const { id } = req.params;
//     Blog.find({ category: req.params.category })
//         .select('_id title category description imageUrl')
//         .then(result => {
//             res.status(200).json({
//                 blog: result
//             })
//         })
//         .catch(err => {
//             res.status(500).json({
//                 error: err
//             })
//         })
// })
