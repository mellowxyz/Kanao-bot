require("dotenv").config();

module.exports = {
    token: process.env.TOKEN || "",  // your bot token
    prefix: process.env.PREFIX || "!", // bot prefix
    ownerID: process.env.OWNERID || "", //your discord id
    SpotifyID: process.env.SPOTIFYID || "", 
    SpotifySecret: process.env.SPOTIFYSECRET || "", 
    mongourl: process.env.MONGO_URI || "", // MongoDb URL
    embedColor: process.env.COlOR || "WHITE", // embed colour
    logs: process.env.LOGS || "851458241685880863", // channel id for guild create and delete logs

    nodes: [
        {
            host: process.env.NODE_HOST || "",
            identifier: process.env.NODE_ID || "",
            port: parseInt(process.env.NODE_PORT || ""),
            password: process.env.NODE_PASSWORD || "",
            secure: parseBoolean(process.env.NODE_SECURE || ""),
      
          }
  ],

}

function parseBoolean(value){
    if (typeof(value) === 'string'){
        value = value.trim().toLowerCase();
    }
    switch(value){
        case true:
        case "true":
            return true;
        default:
            return false;
    }
}
