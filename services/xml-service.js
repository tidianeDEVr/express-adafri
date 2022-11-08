const builder = require('xmlbuilder');
const url = require('../config').API_URL
const config = require('../config')
const crypto = require('crypto-js')

module.exports = {
    buildHomeXML: function buildHomeXML(activeCampaign, msisdn){
        if(activeCampaign.length === 1){
            var root = builder.create('page')
            .ele('p',{}, `${activeCampaign[0].description}`).up()
            .ele('p',{}, 'Faites votre choix : ').up()
            .ele('a', {'href': `${config.ADAFRI_ENDPOINTS.USSD}/respond-survey?msisdn=${msisdn}&step=0`}, '1. Commencer a repondre').up()
            .ele('a', {'href': config.ADAFRI_ENDPOINTS.USSD}, '3. Plus d\'informations').up()
            .ele('a', {'href': config.ADAFRI_ENDPOINTS.USSD}, '2. Quitter').up()
            var xml = root.end({ pretty: true});
        }else{
            var xml = builder.create('page')
            .ele('p',{}, 'Bienvenue sur le portail de ADAFRI.').up()
            .ele('p',{}, 'Rendez-vous sur notre Site WEB pour configurer votre sondage.').up()
            .end({ pretty: true});
        }
        return xml;
    },
    buildRespondXML: function buildRespondXML(step, activeCampaign, msisdn){
        if(activeCampaign.length === 1){
            var root = builder.create('page')
            .ele('p',{}, activeCampaign[0].questions[step].libelle).up()
            .ele('p',{}, 'Faites votre choix : ').up();
            activeCampaign[0].questions[step].choices.forEach((value, index) => {
                root.ele('a', {'href': `${url}/respond-survey?msisdn=${msisdn}&step=${step}&choice=${index}`}, `${index+1}. ${value}`).up();
            });
            var xml = root.end({ pretty: true});
        }else{
            var xml = builder.create('page')
            .ele('p',{}, 'Une erreur s\'est produite. Veuillez reessayer ulterieurement.').up()
            .end({ pretty: true});
        }
        return xml;
    },
    sendSmsCampaign: function sendSmsCampaign(sendto, content, sender){
        var hash = crypto.HmacSHA256(content, config.LAFRICA_DATA.login);
        var base64 = hash.toString(crypto.enc.Base64);
        var hmac = base64

        var root = builder.create('push', { encoding: "iso-8859-1" })
        .att('accountid',  config.LAFRICA_DATA.login)
        .att('password', config.LAFRICA_DATA.password)
        .att('ret_id', "Push 1")
        .att('hmac',  hmac)
        .att('name', "name")
        .att('userdata', "User Data Multiple Sent")
        .att('sender', sender)
        .ele('message')
            .ele('text', {}, content).up()
            .ele('to', {}, sendto).up()
        .up()
        var xml = root.end({ pretty: true });
        return xml;
    }
}
