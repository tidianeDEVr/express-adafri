module.exports = {
    verifyCampaignData: function verifyCampaignAtlantisData(campaign){
        if(!campaign.owner) return false;
        if(!campaign.type) return false;
        if(!campaign.numberOfDays) return false;
        if(!campaign.startAt) return false;
        if(!campaign.finishAt) return false;
        if(!campaign.broadcastLocations) return false;
        if(!campaign.countries) return false;
        return true;
    }
}