require("dotenv").config()
const express = require("express");
const userRouter = express.Router()
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/User.model");
const bcrypt = require('bcrypt');

userRouter.post("/register", async (req, res) => {
    const { email, pass, name, age } = req.body
    const saltRounds = 5
    try {
        bcrypt.hash(pass, saltRounds, async (err, hash) => {
            if (err) {
                res.send(`${err} while hashing`);
                console.log(err)
            } else {
                const user = new UserModel({ email, pass: hash, name, age });
                await user.save()
                res.send("Registered");
            }
        });

    } catch (error) {
        res.send(`Error:${error} in Registering the user`)
        console.log(`Error:${error}`)
    }
})
userRouter.post("/login", async (req, res) => {
    const { email, pass } = req.body

    try {
        const user = await UserModel.find({ email });
        const hashed_pass = user[0].pass
        if (user.length > 0) {
            bcrypt.compare(pass, hashed_pass, (err, result) => {

                if (result) {
                    const token = jwt.sign({ userID: user[0]._id }, process.env.key, { expiresIn: '1h' });
                    res.send({ "msg": "Login Successfull", "token": token });
                } else {
                    res.send("Wrong Credentials Please fill correct details");
                }
            });

        } else {
            res.send("Wrong Credentials Please fill correct details");
        }

    } catch (error) {
        res.send(`Error:${error} in Logging the user`)
        console.log(`Error:${error}`)
    }

})

module.exports = { userRouter }