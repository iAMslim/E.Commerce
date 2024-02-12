const router = require("express").Router()

router.use("/orders", require("./order"))
router.use("/products", require("./product"))
router.use("/users", require("./user"))

module.exports = router