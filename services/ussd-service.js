module.exports = {
    checkUserAlreadyRespond: function checkUserAlreadyRespond(msisdn, survey){
        let questions = survey.questions
        for (let response of questions[questions.length-1].responses){
            if (response.answeringNum == msisdn) return true;  
        }
        return false;
    }
}