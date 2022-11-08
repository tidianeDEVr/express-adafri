const express = require('express')
const config = require('../config')
const xmlService = require('../services/xml-service')
const router = express.Router()


// Send SMS Campaigns
router.post("/make-campaign", async(req, res) => {
    let xml = xmlService.sendSmsCampaign('774845438', 'Hello World!', 'ADAFRI')
    res.send(xml)
    // res.send(resp)
})

module.exports = router
