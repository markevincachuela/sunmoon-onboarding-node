const pool = require("../../config/database");

module.exports = {
    create: (data, callBack)=>{
        pool.query(
            `INSERT INTO registration (name, email, password)
                            values (?,?,?)`,
            [
                data.name,
                data.email,
                data.password
            ],
            (error,results,field)=>{
                if (error){
                    return callBack(error);
                }
                return callBack(null,results);
            }

        );
    },

    getUsers : callBack =>{
        pool.query(
            `SELECT id,name,email FROM registration`,
            [],
            (error, results, fields)=>{
                if (error) {
                    return callBack(error);
                }
                return callBack(null,results);
            }
        );
    },

    getUserbyId: (id,callBack)=>{
        pool.query(
            `SELECT id,name,email FROM registration WHERE id =? `,
            [id],
            (error, results, fields)=>{
                if (error){
                   return callBack(error);
                }
                return callBack(null, results[0])
            }
        );
    },

    updateUser: (data, callBack) => {
        pool.query(
          `update registration set name=?, email=? where id = ?`,
          [
            data.name,
            data.email,
            data.id
          ],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results);
          }
        );
      },

    deleteUser: (data, callBack)=> {
        pool.query(
            `DELETE FROM registration WHERE id =? `,
            [data.id],
            (error,results,fields)=>{
                if (error){
                   return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

    getUserByUserEmail: (email, callBack)=>{
        pool.query(
            `SELECT * FROM registration where email = ?`,
            [email],
            (error, results, fields)=>{
                if (error){
                    callBack(error);
                }
                return callBack(null,results[0]);
            }
        )
    }
};