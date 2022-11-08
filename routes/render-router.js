const express = require('express')
const config = require('../config')
const router = express.Router()
const billboards = config.db.collection('billboards-campaigns')

router.get("/campaign/:id", async (req, res) => {
    let id =  req.params.id
    let campaign = undefined;
    const snapshot = await billboards.get()
    snapshot.docs.map((doc) => { if(id === doc.id) campaign = doc.data() })
    if(id === undefined || campaign === undefined) return res.status(404).render('not-found')
    res.render('files', { campaign: campaign})
    
}) 

module.exports = router