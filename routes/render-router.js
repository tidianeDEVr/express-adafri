const express = require('express')
const config = require('../config')
const router = express.Router()
const billboards = config.db.collection('billboards-campaigns')

router.get("/campaign/:name", async (req, res) => {
    let name =  req.params.name
    let campaign = undefined;
    const snapshot = await billboards.get()
    snapshot.docs.map((doc) => { if(name === doc.data().name) campaign = doc.data() })
    if(name === undefined || campaign === undefined) return res.status(404).render('not-found')
    res.render('files', { campaign: campaign}) 
}) 

module.exports = router