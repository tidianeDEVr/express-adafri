const firebase = require('firebase')
const firebaseConfig = {
    apiKey: "AIzaSyDWCZmZif4lKPgMZ0bpR4my9X9c9hAmwmQ",
    authDomain: "adafri-lafrica.firebaseapp.com",
    databaseURL: "https://adafri-lafrica-default-rtdb.firebaseio.com",
    projectId: "adafri-lafrica",
    storageBucket: "adafri-lafrica.appspot.com",
    messagingSenderId: "36190727981",
    appId: "1:36190727981:web:9e5f9d8dc9f88812be2da4"
};
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
const LAFRICA_DATA = {
    "VOICE_ENDPOINT": "https://voice.lafricamobile.com/api",
    "USSD_ENDPOINT": "https://ussd.lafricamobile.com:3443/session",
    "SMS_ENDPOINT": "https://lampush-json.lafricamobile.com/sms/push",
    "SOLDE_ENDPOINT": "https://lampush-tls.lafricamobile.com/credits",
    "login": "ADAFRI",
    "password": "4L7pAqVqW5Q",
}
const SLACK_DATA = {
    "WEBHOOK_ATLANTIS_URL": "https://hooks.slack.com/services/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",
    "ATLANTIS_CHANNEL": "C0496JQT090",
    "WEBHOOK_AUCHAN_URL": "https://hooks.slack.com/services/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",
    "AUCHAN_CHANNEL": "C049YSQBPMZ"
}
const ADAFRI_ENDPOINT = "http://localhost:3000"
const ADAFRI_ENDPOINTS = {
    "BILLBOARDS": `${ADAFRI_ENDPOINT}/api/billboards`,
    "USSD": `${ADAFRI_ENDPOINT}/api/ussd`,
    "SMS": `${ADAFRI_ENDPOINT}/api/sms`,
    "VOICE": `${ADAFRI_ENDPOINT}/api/voice`,
    "RENDER": `${ADAFRI_ENDPOINT}/render`,
}
module.exports = { LAFRICA_DATA, db, ADAFRI_ENDPOINTS, SLACK_DATA };