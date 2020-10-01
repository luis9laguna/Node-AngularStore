//REQUIRED
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client( process.env.GOOGLE_ID );

//CODE
const googleVerify = async( token ) => {

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_ID,  
    });
    const payload = ticket.getPayload();
    const { name, email } = payload;

    return { name, email };
}

module.exports = { googleVerify }