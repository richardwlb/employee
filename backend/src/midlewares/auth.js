const jwt = require('jsonwebtoken');
authConfig = require('../config/auth');

module.exports = (req, res, next) => {

    const authHeader = req.headers.authorization;
    
    if(!authHeader)
        return res.status(401).send({ error: 'No token provided.' });

    const parts = authHeader.split(' ');
    
    if( !parts.length === 2)
    
        return res.status(401).send({ error: 'Token error.' });

    const [ scheme, token] = parts;

    if(!scheme === 'Bearer')
        return res.status(401).send({ error: 'Token malformatted.' })

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err) return res.status(401).send({ error: 'Invalid token.' });

        req.login = decoded.login;
        return next();

    })    

}