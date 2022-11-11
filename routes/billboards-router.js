const express = require('express')
const config = require('../config')
const { verifyBodyAtlantisData, verifyBodyAuchanData } = require('../services/billboards-service')
const axios = require('axios')
const billboards = config.db.collection('billboards-campaigns')
const router = express.Router()

router.post("/create-campaign/atlantis", async (req, res) => { 
    res.type('application/json');
    if(verifyBodyAtlantisData(req.body)) return res.status(500).send('Missing Data')
    let newCampaign = await billboards.add(req.body)
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
                                "text": `*Annonceur:*\n${req.body.owner}`
                            },
                            {
                                "type": "mrkdwn",
                                "text": `*Nombre Jours:*\n${req.body.numberOfDays}`
                            },
                            {
                                "type": "mrkdwn",
                                "text": `*Date Debut:*\n${req.body.startAt}`
                            },
                            {
                                "type": "mrkdwn",
                                "text": `*Date Fin:*\n${req.body.finishAt}`
                            },
                            {
                                "type": "mrkdwn",
                                "text": `*Heures Diffusion:*\n${req.body.broadcastHours}`
                            },
                            {
                                "type": "mrkdwn",
                                "text": `*Pays:*\n${req.body.countries}`
                            },
                            {
                                "type": "mrkdwn",
                                "text": `*Ecrans Sélectionnés:*\n${req.body.broadcastLocations}`
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
                                "url": `${config.ADAFRI_ENDPOINTS.BILLBOARDS}`
                            },
                            {
                                "type": "button",
                                "text": {
                                    "type": "plain_text",
                                    "emoji": true,
                                    "text": "ANNULER"
                                },
                                "style": "danger",
                                "value": "click_me_123"
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
    axios.post(config.SLACK_DATA.WEBHOOK_ATLANTIS_URL, slackBlockKit)
    .then(() => {
        res.status(200).send('Success')
    }).catch(() => {
        res.status(500).send('Error')
    })
})

router.post("/create-campaign/auchan", async (req, res) => {
    res.type('application/json')
    if(verifyBodyAuchanData(req.body)) return res.status(500).send('Missing data')
    let newCampaign = await billboards.add(req.body)
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
                                "text": `*Annonceur:*\n${req.body.owner}`
                            },
                            {
                                "type": "mrkdwn",
                                "text": `*Nombre Jours:*\n${req.body.numberOfDays}`
                            },
                            {
                                "type": "mrkdwn",
                                "text": `*Date Debut:*\n${req.body.startAt}`
                            },
                            {
                                "type": "mrkdwn",
                                "text": `*Date Fin:*\n${req.body.finishAt}`
                            },
                            {
                                "type": "mrkdwn",
                                "text": `*Heures Diffusion:*\n${req.body.broadcastHours}`
                            },
                            {
                                "type": "mrkdwn",
                                "text": `*Ecrans Sélectionnés:*\n${req.body.broadcastLocations}`
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
                                "url": `${config.ADAFRI_ENDPOINTS.BILLBOARDS}`
                            },
                            {
                                "type": "button",
                                "text": {
                                    "type": "plain_text",
                                    "emoji": true,
                                    "text": "ANNULER"
                                },
                                "style": "danger",
                                "value": "click_me_123"
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

module.exports = router