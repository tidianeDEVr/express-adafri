const express = require('express')
const config = require('../config')
const router = express.Router()

// Get Campagn By Owner
router.get("/get", async(req, res) => {
    res.send('BY OWNER')
})

// Get All Campagn By Owner
router.get("/get/:owner", async(req, res) => {
    res.send('ALL')
})

// Get Campaign By ID
router.get("/get/:id", async(req, res) => {
    res.send('BY ID')
})

// CREATE CAMPAIGN 
router.get("/", async (req, res) => { 
    res.type('application/json');
    res.send('ok')
})

module.exports = router