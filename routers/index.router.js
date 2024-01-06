const { Router } = require("express")
const bookRouter = require("./book.router")

const router = Router()

router.get("/", (req, res) => {
    res.json({ message: "Server is running" })
})

router.use(bookRouter)

module.exports = router
