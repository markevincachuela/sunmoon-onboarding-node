module.exports = {
    checkBasic : (req,res,next)=>{
        const auth = req.headers["authorization"];

        const emailpass = auth.split(" ")[1];  
        const text = Buffer.from(emailpass, "base64").toString("ascii");

        const email = text.split(":")[0];
        const password = text.split(":")[1];

        

        if (email == "kevs" && password == "kevs") 
        {
            return next();
        } else {
            return res.json("Access Denied.");
        }
            }
};