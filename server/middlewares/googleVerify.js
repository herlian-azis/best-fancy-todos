const { OAuth2Client } = require('google-auth-library')

const client = new OAuth2Client(process.env.CLIENT_ID)

module.exports = (req, res, next) => {
    // console.log(req.body);
    client.verifyIdToken({
        idToken: req.body.id_token,
        audience: process.env.CLIENT_ID
    })
    .then(verified=>{
        req.payload = verified.getPayload()
        next()
    })
    .catch(err=>{
        res.status(500).json(err)
    })
}