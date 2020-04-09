const connection = require('../conn');

module.exports = {

    async store(req, res){
        const { last_name, first_name, birth_date, id_area, id_nationality } = req.body; 

        console.log(req.body);

            connection.query(`
            insert 
                into employee (
                last_name
            , first_name
            , birth_date
            , id_area
            , id_nationality) 
            values (
                '${last_name}'
                , '${first_name}'
                , '${birth_date}'
                , '${id_area}'
                , '${id_nationality}'
            )`,  await function (err, result, fields) {
                
                if(err){
                    console.log(err.sqlMessage);
                    return res.status(401).send({ error: err.sqlMessage });
                }
                return res.send(result);
            });

    }, 
    

    async list(req, res) {
        const login = req.login;

        await connection.query('SELECT * FROM employee', (err, result, fields) => {
            result = !(err) ? result : err;
            
            return res.send({ result, login});
        })
    },    

    async show(req, res) {
        const id = req.params.id;

        connection.query(`SELECT * FROM employee where id = ${id}`, await function (err, result, fields) {
            result = !(err) ? result : err;
            return res.send(result);
        });

    },

    async update(req, res) {
        const id = req.params.id;
        const { last_name, first_name, birth_date, id_area, id_nationality } = req.body;

        connection.query(`update employee set
                          last_name         = '${last_name}'
                        , first_name        = '${first_name}'
                        , birth_date        = '${birth_date}'
                        , id_area           = '${id_area}'
                        , id_nationality    = '${id_nationality}'
                        where id  = ${id}`
                        ,  await function (err, result, fields) {
                            result = !(err) ? result : err;
                            return res.send(result);
                        });

    },

    async destroy(req, res) {
        const id = req.params.id;

        connection.query(`delete from employee where id = ${id}`, await function (err, result, fields) {
            result = !(err) ? result : err;
            return res.send(result);
        });

    }

}