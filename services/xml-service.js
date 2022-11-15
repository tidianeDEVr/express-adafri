const builder = require('xmlbuilder');
const config = require('../config')

module.exports = {
    buildHomeXML: function buildHomeXML(activeCampaign, msisdn){
        if(activeCampaign.length === 1){
            var root = builder.create('page')
            .ele('p',{}, `Bienvenue, ceci est un sondage de ${activeCampaign.owner} !`).up()
            .ele('p',{}, 'Faites votre choix : ').up()
            .ele('a', {'href': `${config.ADAFRI_ENDPOINTS.USSD}/respond-survey?msisdn=${msisdn}&step=0`}, '1. Commencer a repondre').up()
            .ele('a', {'href': config.ADAFRI_ENDPOINTS.USSD}, '2. Plus d\'informations').up()
            .ele('a', {'href': config.ADAFRI_ENDPOINTS.USSD}, '3. Quitter').up()
            var xml = root.end({ pretty: true});
        }else{
            var xml = builder.create('page')
            .ele('p',{}, 'Bienvenue sur le portail de ADAFRI.').up()
            .ele('p',{}, 'Rendez-vous sur notre Site WEB pour configurer votre sondage.').up()
            .end({ pretty: true});
        }
        return xml;
    },
    buildRespondXML: function buildRespondXML(activeCampaign, msisdn, step = 0){
        var root = builder.create('page')
        .ele('p',{}, activeCampaign.questions[step].libelle).up()
        .ele('p',{}, 'Faites votre choix : ').up();
        activeCampaign.questions[step].choices.forEach((value, index) => {
            root.ele('a', {'href': `${config.ADAFRI_ENDPOINTS.SMS}/respond-survey?msisdn=${msisdn}&step=${step}&choice=${index}`}, `${index+1}. ${value}`).up();
        });
        var xml = root.end({ pretty: true});

        return xml;
    },
    buildErrorXML: function buildErrorXML(){
        var xml = builder.create('page')
        .ele('p',{}, 'Une erreur s\'est produite. Veuillez reessayer ulterieurement.').up()
        .end({ pretty: true});
        return xml;
    },
    buildGreatingXML: function buildGreatingXML(){
        var xml = builder.create('page')
        .ele('p',{}, 'Vous avez deja repondu a ce sondage. Merci et a bientot').up()
        .end({ pretty: true});
        return xml;
    }
}

