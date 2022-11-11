const config = require('../config')
module.exports = {
    verifyBodySmsCampaign: function verifyBodySmsCampaign(body){
        if(!body.name) return false;
        if(!body.status) return false;
        if(!body.messageBrut) return false;
        if(!body.messageFormatted) return false;
        if(!body.contacts) return false;
        if(!body.senderId) return false;
        if(!body.createdBy) return false;
        if(!body.accountId) return false;
        if(!body.owner) return false;
        if(!body.createdAt) return false;
        if(!body.validateAt) return false;
        if(!body.publishing) return false;
        if(!body.provider) return false;
        return true;
    },
    buildBodySmsCampaign: function buildBodySmsCampaign(campaign){
        let text = campaign.messageFormatted;
        let to = campaign.contacts;
        let sender = campaign.sender;
        const object = {
            "accountid": `${config.LAFRICA_DATA.login}`,
            "password": `${config.LAFRICA_DATA.password}`,
            "sender": `GODEX`,
            "text": `PUBG`,
            "to": `221784725209`
        }
        return JSON.stringify(object);
    }
}