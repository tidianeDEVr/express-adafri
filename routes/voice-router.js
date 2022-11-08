const express = require('express')
const config = require('../config')
const router = express.Router()

router.get("/", async (req, res) => { 
    res.type('application/json');
    res.send('ok')
})

module.exports = router