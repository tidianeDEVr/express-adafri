const express = require('express')
const config = require('../config')
const xmlService = require('../services/xml-service')
const ussdService = require('../services/ussd-service')
const router = express.Router()
const surveys = config.db.collection('ussd-surveys')
const axios = require('axios')

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
    var activeSurvey;
    let step;
    req.body.step ? step = req.body.step : step = 0;
    let params = {
        "msisdn": req.body.msisdn,
        "step": step,
        "choice": req.body.choice 
    }
    
    let hasAlreadyRespond = ussdService.checkUserAlreadyRespond(params.msisdn, activeSurvey)
    
    
    await surveys.where("status", '==', 'active').limit(1).get().then(async (surv)=>{
        activeSurvey = await surv.docs[0].data()
    }).catch(()=>{
        return res.send(xmlService.buildErrorXML())
    })
    if( params.step > activeSurvey.questions.length || hasAlreadyRespond ) return xmlService.buildGreatingXML()
    // let xml = xmlService.buildRespondXML(params.step, activeSurvey, params.msisdn)
    // res.send(xml)

    res.send(hasAlreadyRespond)
})

router.post("/create", async (req, res) => {
    const data = req.body
    await surveys.add(data)
    res.send({msg: "Survey Added "})
})

module.exports = router