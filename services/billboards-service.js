module.exports = {
    verifyBodyAtlantisData: function verifyBodyAtlantisData(body){
        if(!body.owner) return false;
        if(!body.type) return false;
        if(!body.numberOfDays) return false;
        if(!body.startAt) return false;
        if(!body.finishAt) return false;
        if(!body.broadcastHours) return false;
        if(!body.broadcastLocations) return false;
        if(!body.countries) return false;
        return true;
    },
    verifyBodyAuchanData: function verifyBodyAuchanData(body){
        if(!body.owner) return false;
        if(!body.type) return false;
        if(!body.numberOfDays) return false;
        if(!body.startAt) return false;
        if(!body.finishAt) return false;
        if(!body.broadcastLocations) return false;
        return true;
    }
}