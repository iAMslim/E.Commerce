const router = require("express").Router()

router.use("/orders", require("./order"))
router.use("/users", require("./user"))
router.use("/books", require("./books"))

module.exports = router