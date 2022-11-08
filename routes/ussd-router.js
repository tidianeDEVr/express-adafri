const express = require('express')
const config = require('../config')
const xmlService = require('../services/xml-service')
const router = express.Router()
const surveys = config.db.collection('surveys')

// Page d'accueil
router.get("/", async (req, res) => { 
    res.type('application/xml');
    let msisdn = req.body.msisdn
    const snapshot = await surveys.get()
    const activeSurvey = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    let xml = xmlService.buildHomeXML(activeSurvey, msisdn);
    console.log(xml)
    res.send(xml)
})

// Repondre aux formulaires
router.post("/respond-survey", async (req, res) => {
    res.type('application/xml');
    let msisdn = req.query.msisdn
    let step = req.query.step
    let choice = req.query.choice
    if (choice) {}
    const snapshot = await surveys.get()
    const activeSurvey = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    console.log(msisdn)
    console.log(step)
    let xml = xmlService.buildRespondXML(step, activeSurvey, msisdn)
    console.log(xml)
    res.send(xml)
})

// router.post("/create", async (req, res) => {
//     const data = req.body
//     await config.surveys.add(data)
//     res.send({msg: "Survey Added "})
// })

module.exports = router