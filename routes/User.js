var express = require("express");
var router = express.Router();
const {
	createUser,
	loginUser,
	verifyUser,
} = require("../Controllers/usersController");

/* GET users listing. */
router.get("/api/", function (req, res, next) {
	res.send("respond with a resource");
});
router.post("/api/register", createUser);
router.post("/api/login", loginUser);
router.get("/api/verify-user", verifyUser);

module.exports = router;
