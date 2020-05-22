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
        const { page = 1, search } = req.query;

        console.log('search: ', search)

        if(search){

            sql = `SELECT count(*) FROM employee where (first_name like '%${search}%' or last_name like '%${search}%' );
            SELECT * FROM employee where (first_name like '%${search}%' or last_name like '%${search}%' ) limit 5 offset ${ ((page - 1) * 5)} `;

        }
        
        if( page == 'all'){
            sql = `SELECT count(*) FROM employee;SELECT * FROM employee `;
        }else{
            sql = `SELECT count(*) FROM employee;SELECT * FROM employee limit 5 offset ${ ((page - 1) * 5)}`;
        }

        
    
        await connection.query( sql, [2, 1], (err, results, fields) => {
            if(err){
                console.log(err);
                return;
            }

            const [count] = results[0];

            res.header('X-Total-Count', count['count(*)']);
            result = results[1];

            console.log(result);

            return res.send({ result, login, page});
        });
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

        console.log(birth_date);

        connection.query(`update employee set
                          last_name         = '${last_name}'
                        , first_name        = '${first_name}'
                        , birth_date        = '${birth_date}'
                        , id_area           = '${id_area}'
                        , id_nationality    = '${id_nationality}'
                        where id  = ${id}`
                        ,  await function (err, result, fields) {
                            result = !(err) ? result : err;
                            console.log(result)
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