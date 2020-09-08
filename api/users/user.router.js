const { createUser, getUserbyId, getUsers, updateUser, deleteUser, login, authenticate } = require("./user.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const { checkBasic } = require("../../auth/basic-auth");



router.post("/login",login);
router.post("/", createUser);


router.get("/",checkToken, getUsers);
router.get("/:id",checkToken, getUserbyId);
router.patch("/",checkToken, updateUser);
router.delete("/",checkToken, deleteUser);
router.post("/authenticate", checkBasic, authenticate);



module.exports = router;