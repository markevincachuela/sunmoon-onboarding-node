const {create, getUsers , getUserbyId, updateUser, deleteUser, getUserByUserEmail} = require("./user.service");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
    createUser: (req,res)=>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password,salt);
        create(body, (err,results)=>{
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getUserbyId : (req,res)=>{
        const id = req.params.id;
        getUserbyId(id, (err,results)=>{
            if (err) {
                console.log(err);
                return;
            }
            if (!results){
                return res.json({
                    success : 0,
                    message : "Record not found"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },

    getUsers: (req, res)=>{
        getUsers((err,results)=>{
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    updateUser: (req, res) => {
        const body = req.body;
        // const salt = genSaltSync(10);
        // body.password = hashSync(body.password, salt);
        updateUser(body, (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          return res.json({
            success: 1,
            message: "updated successfully"
          });
        });
      },

    deleteUser: (req , res)=>{
        const data = req.body;
        deleteUser(data, (err, results)=>{
            if (err){
                console.log(err);
                return;
            }
            if (!results){
                return res.json({
                    success: 0,
                    message: "Record Not Found"
                });
            }
            return res.json({
                success: 1,
                message: "user deleted"
            });
        });
    },

    login: (req,res)=>{
        const body = req.body;
        getUserByUserEmail(body.email,(err,results)=>{
            if (err){
                console.log(err)
            }
            if(!results){
                return res.json({
                    success: 0 ,
                    data: "Invalid email and password"
                });
            }

            const result = compareSync(body.password, results.password);
            if (result){
                result.password = undefined;
                const jsontoken = sign({ result: results }, "qwe123",{
                    expiresIn: "1h"
                });
                return res.json({
                    success: 1,
                    message: 'login success',
                    token: jsontoken
                });
            }
            else{
                return res.json({
                    success : 0,
                    data: "Invalid"
                });
            }
        });
    },

    authenticate : (req,res,next)=>{
        const body = req.body;
        getUserByUserEmail(body.email,(err,results)=>{
            if (err){
                console.log(err)
            }
            if(!results){
                return res.json({
                    success: 0 ,
                    data: "Invalid email and password"
                });
            }
            

            const result = compareSync(body.password, results.password);
            if (result){
                result.password = undefined;
              
                return res.json({
                    success: 1,
                    message: 'login success',
                    email: body.email,
                    password : body.password
                });
            }
            else{
                return res.json({
                    success : 0,
                    data: "Invalid"
                });
            }
        });
    }

    
};