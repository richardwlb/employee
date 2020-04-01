const connection = require('../conn');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const configAuth = require('../config/auth');

function generateToken( params = {} ){
    return jwt.sign( params, configAuth.secret, {
        expiresIn: 86400
    });
}

module.exports = {

    async register (req, res) {
        const { login, password, email } = req.body;
        const saltRounds = 10;
        const hash = bcrypt.hashSync(password, saltRounds);

        connection.query(`insert 
                            into login (
                            login,
                            password,
                            email ) 
                        values (
                            '${login}' ,
                            '${hash}' ,
                            '${email}'
                        )`,  await function (err, result, fields) {
                            result = !(err) ? result : err;

                            if(err){
                                return res.status(400).send({ error: 'Error on register.' })
                            }
                            const token = generateToken({ login: login })
                            return res.send({ result, token});
                        });
    },

    login (req, res){
        const { login, password } = req.body;

        try{
            connection.query(`select * from login where login = '${login}'  limit 1`, function ( err, result) { 
                        if (result.length > 0 ) {
                            const hash = result[0].password
                            const match = bcrypt.compareSync(password, hash);

                            if (match === true) {

                                result[0].password = undefined;

                                const token = generateToken({ login: result[0].login });

                                return res.send({result, token});
                            }else{
                                return(res.status(400).send({ error: 'Invalid password.'}));
                            }
                        }else{
                            return(res.status(400).send({ error: 'User not found.'}));
                        }
                    });
                }catch(err){
                    alert('error');
                }


    }

}