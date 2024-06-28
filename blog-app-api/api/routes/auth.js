const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// user signup || POST
router.post('/user/signup', (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        }
        else {
            const user = new User({
                _id: new mongoose.Types.ObjectId,
                fullName: req.body.fullName,
                email: req.body.email,
                password: hash
            })
            user.save()
                .then(result => {
                    res.status(200).json({
                        newUser: result
                    })
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    })
                })
        }
    })
})

// user login 
router.post('/user/login', (req, res) => {
    User.find({ email: req.body.email })
        .then(user => {
            console.log(user);
            if (user.length < 1) {
                return res.status(404).json({
                    message: "User is not found"
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (!result) {
                    return res.status(401).json({
                        message: "password is not matched"
                    })
                }
                const token = jwt.sign({
                    email: user[0].email,
                    fullName: user[0].fullName
                },
                    process.env.JWT,
                    {
                        expiresIn: '365d'
                    }
                )
                res.status(200).json({
                    email: user[0].email,
                    fullName: user[0].fullName,
                    token: token
                })
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

// Admin Login
router.post('/admin/login', (req, res) => {
    const pass = process.env.PASS;
    const uN = process.env.USER_NAME;

    if (req.body.userName == uN && req.body.password == pass) {
        const token = jwt.sign({
            email: 'soumen@gmail.com',
            fullName: 'Soumen Mahato'
        },
            process.env.JWT,
            {
                expiresIn: '365d'
            }
        )
        return res.status(200).json({
            fullName: 'Soumen Mahato',
            email: 'soumen@gmail.com',
            token: token
        })
    }
    res.status(401).json({
        message: 'bad request'
    })
})

module.exports = router;