const express = require('express')
const config = require('../config')
const xmlService = require('../services/xml-service')
const ussdService = require('../services/ussd-service')
const router = express.Router()
const surveys = config.db.collection('ussd-surveys')

// HOME PAGE
router.get("/", async (req, res) => { 
    res.type('application/xml');
    let msisdn = req.body.msisdn
    const snapshot = await surveys.get()
    const activeSurvey = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    let xml = xmlService.buildHomeXML(activeSurvey, msisdn);
    console.log(xml)
    res.send(xml)
})

// RESPOND SURVEY
router.post("/respond-survey/:step", async (req, res) => {
    res.type('application/xml');
    var activeSurvey;
    let step = req.params.step
    let msisdn = req.body.msisdn

    // GENERATE XML VIEW
    await surveys.where("status", '==', 'active').limit(1).get().then(async (surv)=>{
        activeSurvey = await surv.docs[0].data()
        let hasAlreadyRespond = ussdService.checkUserAlreadyRespond(msisdn, activeSurvey)
        if( step > activeSurvey.questions.length || hasAlreadyRespond ) return res.send(xmlService.buildGreatingXML())
        res.send(xmlService.buildRespondXML(activeSurvey, msisdn, step))
    }).catch(()=>{
        return res.send(xmlService.buildErrorXML())
    })
})

// CREATE SURVEY
router.post("/create", async (req, res) => {
    const data = req.body
    await surveys.add(data)
    res.send({msg: "Survey Added "})
})

module.exports = router