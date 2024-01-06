const { Router } = require("express")
const BookController = require("../controllers/book.controller")

const router = Router()

//using auth to check if token is present
router.get("/books", BookController.getBooks)
router.get("/books/:id", BookController.getBookById)
router.post("/books/add", BookController.addBook)
router.put("/books/:id/update", BookController.updateBook)
router.delete("/books/:id", BookController.deleteBook)

module.exports = router