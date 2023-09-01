const express = require("express")
const router = express.Router()
const UserFollow = require("../model/UsersFollows")

// create a new Follow
router.post("/", async (req,res) => {
    try {
        const userFollow = await UserFollow.create(req.body)
        res.status(200).json
    } catch (error) {
        
    }
})