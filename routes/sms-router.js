const express = require('express')
const config = require('../config')
const router = express.Router()
const sms_campaigns = config.db.collection('sms-campaigns')
const { verifyBodySmsCampaign, buildBodySmsCampaign } = require("../services/sms-service") 
const axios = require('axios')


// Send SMS Campaigns
router.post("/make-campaign", async(req, res) => {
    res.type('application/json');
    if(verifyBodySmsCampaign(req.body)) return res.status(500).send('Missing Data')
    let newCampaign = await sms_campaigns.add(req.body)
    let jsonCampaign = buildBodySmsCampaign(newCampaign)
    let response = axios.post( config.LAFRICA_DATA.SMS_ENDPOINT, jsonCampaign)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
    console.Console(response)
    res.send(xml)
})

// SOLDE DU COMPTE
router.get("/get-balance", async(req, res) => {
    let xml = undefined;
    axios.get( `${config.LAFRICA_DATA.SOLDE_ENDPOINT}
    ?accountid=${config.LAFRICA_DATA.login}
    &password=${config.LAFRICA_DATA.password}`).then((response) => {
        xml = response.data
        // return res.send(response.data)
    }).catch(() => {
        console.log("Error")
    })
    console.log(xml)
    res.send(xml)
})

module.exports = router
