const express = require('express')
const config = require('../config')
const { verifyCampaignData } = require('../services/billboards-service')
const axios = require('axios')
const billboards = config.db.collection('billboards-campaigns')
const router = express.Router()
const moment = require('moment')

// Get Campagn By Owner
router.get("/get", async(req, res) => {
    res.send('BY OWNER')
})

// Get All Campagn By Owner
router.get("/get/:owner", async(req, res) => {
    let owner =  req.params.owner
    let campaigns = []
    const snapshot = await billboards.get()
    // Get Owner's Campaigns
    snapshot.docs.map((doc) => { if(owner === doc.data().owner) campaigns.push(doc.data()) })
    res.send(campaigns)
})

router.post("/create/atlantis", async (req, res) => { 
    res.type('application/json');
    let campaign = req.body.campaign;
    if(verifyCampaignData(campaign)) return res.status(500).send('Missing Data')
    let countries = '';
    let locations = '';
    for (let location of campaign.broadcastLocations){
        locations += ` * ${location.name}\n`
    }
    for (let country of campaign.countries){
        countries += ` * ${country.name} `
    }
    let newCampaign = await billboards.add(campaign)
    let startAt = moment(campaign.startAt).utc().format('MM/DD/YYYY')
    let finishAt = moment(campaign.finishAt).utc().format('MM/DD/YYYY')
    if(!newCampaign) return res.status(500).send('Erreur lors de l\'insertion')
    let slackBlockKit = {
        "attachments": [
            {
                "color": "#002071",
                "blocks": [
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": "Vous avez une nouvelle commande :\n*<app.adafri.com|Adafri - Nouvelle commande>*"
                        }
                    },
                    {
                        "type": "section",
                        "fields": [
                            {
                                "type": "mrkdwn",
                                "text": "*Type:*\nPanneaux Publicitaires"
                            },
                            {
                                "type": "mrkdwn",
                                "text": `*Annonceur:*\n${campaign.owner}`
                            },
                            {
                                "type": "mrkdwn",
                                "text": `*Nombre Jours:*\n${campaign.numberOfDays}`
                            },
                            {
                                "type": "mrkdwn",
                                "text": `*Date Debut:*\n${startAt}`
                            },
                            {
                                "type": "mrkdwn",
                                "text": `*Date Fin:*\n${finishAt}`
                            },
                            {
                                "type": "mrkdwn",
                                "text": `*Pays:*\n${countries}`
                            },
                            {
                                "type": "mrkdwn",
                                "text": `*Ecrans Sélectionnés:*\n${locations}`
                            }
                        ]
                    },
                    {
                        "type": "actions",
                        "elements": [
                            {
                                "type": "button",
                                "text": {
                                    "type": "plain_text",
                                    "emoji": true,
                                    "text": "APPROUVER",
                                },
                                "style": "primary",
                                "value": "click_me_123",
                                "url": `${config.ADAFRI_ENDPOINTS.BILLBOARDS}/validate/${newCampaign.id}`
                            },
                            {
                                "type": "button",
                                "text": {
                                    "type": "plain_text",
                                    "emoji": true,
                                    "text": "ANNULER"
                                },
                                "style": "danger",
                                "value": "click_me_123",
                                "url": `${config.ADAFRI_ENDPOINTS.BILLBOARDS}/cancel/${newCampaign.id}`
                            }
                        ]
                    },
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": "Cliquez-ici pour téléverser  le(s) fichier(s) uploadé(s).\n\nNe cliquez sur *APPROUVER* que lorsque l'annonce sera en diffusion !\n Merci :slightly_smiling_face:"
                        },
                        "accessory": {
                            "type": "button",
                            "text": {
                                "type": "plain_text",
                                "text": "FICHIERS",
                                "emoji": true
                            },
                            "value": "click_me_123",
                            "url": `${config.ADAFRI_ENDPOINTS.RENDER}/campaign/${campaign.name}`,
                            "action_id": "button-action"
                        }
                    }
                ]
            }
        ]
    }
    axios.post(config.SLACK_DATA.WEBHOOK_ATLANTIS_URL, slackBlockKit)
    .then(() => {
        res.status(200).send('Success')
    }).catch(() => {
        res.status(500).send('Error')
    })
})

router.post("/create/auchan", async (req, res) => {
    res.type('application/json')
    let campaign = req.body.campaign
    if(verifyCampaignData(campaign)) return res.status(500).send('Missing data')
    let newCampaign = await billboards.add(campaign)
    let startAt = moment(campaign.startAt).utc().format('MM/DD/YYYY')
    let finishAt = moment(campaign.finishAt).utc().format('MM/DD/YYYY')
    let locations = ''
    for (location of campaign.broadcastLocations){
        locations += ` * ${location.name} \n`
    }
    let blockKit = {
        "attachments": [
            {
                "color": "#E01E5A",
                "blocks": [
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": "Vous avez une nouvelle commande :\n*<app.adafri.com|Adafri - Nouvelle commande>*"
                        }
                    },
                    {
                        "type": "section",
                        "fields": [
                            {
                                "type": "mrkdwn",
                                "text": "*Type:*\nPanneaux Publicitaires"
                            },
                            {
                                "type": "mrkdwn",
                                "text": `*Annonceur:*\n${campaign.owner}`
                            },
                            {
                                "type": "mrkdwn",
                                "text": `*Nombre Jours:*\n${campaign.numberOfDays}`
                            },
                            {
                                "type": "mrkdwn",
                                "text": `*Date Debut:*\n${startAt}`
                            },
                            {
                                "type": "mrkdwn",
                                "text": `*Date Fin:*\n${finishAt}`
                            },
                            {
                                "type": "mrkdwn",
                                "text": `*Ecrans Sélectionnés:*\n${locations}`
                            }
                        ]
                    },
                    {
                        "type": "actions",
                        "elements": [
                            {
                                "type": "button",
                                "text": {
                                    "type": "plain_text",
                                    "emoji": true,
                                    "text": "APPROUVER"
                                },
                                "style": "primary",
                                "value": "click_me_123",
                                "url": `${config.ADAFRI_ENDPOINTS.BILLBOARDS}/validate/${newCampaign.id}`
                            },
                            {
                                "type": "button",
                                "text": {
                                    "type": "plain_text",
                                    "emoji": true,
                                    "text": "ANNULER"
                                },
                                "style": "danger",
                                "value": "click_me_123",
                                "url": `${config.ADAFRI_ENDPOINTS.BILLBOARDS}/cancel/${newCampaign.id}`
                            }
                        ]
                    },
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": "Cliquez-ici pour téléverser  le(s) fichier(s) uploadé(s).\n\nNe cliquez sur *APPROUVER* que lorsque l'annonce sera en diffusion !\n Merci :slightly_smiling_face:"
                        },
                        "accessory": {
                            "type": "button",
                            "text": {
                                "type": "plain_text",
                                "text": "FICHIERS",
                                "emoji": true
                            },
                            "value": "click_me_123",
                            "url": `${config.ADAFRI_ENDPOINTS.RENDER}/campaign/${newCampaign.id}`,
                            "action_id": "button-action"
                        }
                    }
                ]
            }
        ]
    }
    axios.post(config.SLACK_DATA.WEBHOOK_AUCHAN_URL, blockKit)
    .then(() => {
        res.status(200).send('Success')
    }).catch(() => {
        res.status(500).send('Error')
    })
})

// UPDATE CAMPAIGN 
router.get("/:action/:id", async (req, res) => {
    // Params
    let action =  req.params.action
    let id =  req.params.id
    let campaign = undefined;
    const snapshot = await billboards.get()
    // Get Actual Campaign
    snapshot.docs.map((doc) => { if(id === doc.id) campaign = doc.data() })
    // Check If Campaign Exist
    if(id === undefined || campaign === undefined || campaign.status != 'waiting_for_validation') return res.status(404).render('not-found')
    // Check Actions
    if(action == 'validate') { 
        campaign.status = 'validated'
        campaign.startAt = new Date()
        campaign.finishAt = moment(new Date(), "DD-MM-YYYY").add(campaign.numberOfDays, 'days').toDate();
        // Notifications
        if(campaign.broadcastType == 'auchan') axios.post(config.SLACK_DATA.WEBHOOK_AUCHAN_URL, { text: `L'annonce *${campaign.name}* a ete approuver ! Merci` })
        if(campaign.broadcastType == 'atlantis') axios.post(config.SLACK_DATA.WEBHOOK_ATLANTIS_URL, { text: `L'annonce *${campaign.name}* a ete approuver ! Merci` })
    }
    if(action == 'cancel') {
        campaign.status = 'canceled'
        // Notifications
        if(campaign.broadcastType == 'auchan') axios.post(config.SLACK_DATA.WEBHOOK_AUCHAN_URL, { text: `L'annonce *${campaign.name}* a ete supprimer ! Merci` })
        if(campaign.broadcastType == 'atlantis') axios.post(config.SLACK_DATA.WEBHOOK_ATLANTIS_URL, { text: `L'annonce *${campaign.name}* a ete supprimer ! Merci` })
    }
    if(action == 'delete') campaign.status = 'deleted'

    // Update Campaign
    billboards.doc(id).update(campaign)
    // Close Tab
    res.send("<script>window.close();</script > ")
})

module.exports = router