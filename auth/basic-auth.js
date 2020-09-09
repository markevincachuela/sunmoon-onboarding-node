const db = require("../config/database");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");

module.exports = {
  checkBasic: (req, res, next) => {
    try {
      const auth = req.headers["authorization"];

      if (!auth) return res.json("Access Denied.");

      const decoded = Buffer.from(auth.split(" ")[1], "base64").toString();
      const [email, password] = decoded.split(":");

      db.query(
        `SELECT * FROM registration where email = ?`,
        [email],
        (error, results, fields) => {
          if (error) {
            return res.json("Access Denied.");
          }
          
          if (results && results.length > 0) {
            if (compareSync(password, results[0].password)) {
              return next()
            } else {
              return res.json("Access Denied.");
            }
          } else {
            return res.json("Access Denied.");
          }
        }
      );

    } catch (error) {
      return res.json("Access Denied.");
    }
  }
}