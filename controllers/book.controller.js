const { PrismaClient, PrismaClientKnownRequestError } = require("@prisma/client")
const prisma = new PrismaClient()

class BookController {
    static async getBooks(req, res){
        const result = await prisma.book.findMany()
        res.status(200).json({ data: result })
    }

    static async getBookById(req, res){
        const result = await prisma.book.findUnique({
            where: {
                id: req.params.id
            }
        })
    
        if(result){
            res.status(200).json({ data: result })  
        } else {
            res.status(404).json({ message: "Data not found" })
        }
    }

    static async addBook(req, res){
        try {
            const addedBook = await prisma.book.create({
                data: {
                    title: req.body.title,
                    author: req.body.author,
                    summary: req.body.summary,
                    price: Number(req.body.price),
                    img: req.body.img,
                    pages: Number(req.body.pages),
                }
            })

            res.status(201).json({ data: addedBook, message: "Data Input Success" })
        } catch(error) {
            if(error instanceof PrismaClientKnownRequestError && error.code === 'P2003'){
                return res.status(404).json({ error: 'Genre does not exist' })
            }

            res.status(500).json({ error: 'An error occured while trying to add a book' })
        } 
    }

    static async deleteBook(req, res){
        try {
            const result = await prisma.book.findUnique({
                where: {
                    id: req.params.id
                }
            })
          
            await prisma.book.delete({
                where: {
                    id: req.params.id
                }
            })

            res.status(200).json({ message: 'Book succesfully deleted.'})
        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError && error.code === 'P2025'){
                return res.status(404).json({ error: 'Book ID does not exist' })
            }

            res.status(500).json({ error: 'An error occured while trying to delete a book' })
        }
    }

    static async updateBook(req, res){
        try {
            const existingBook = await prisma.book.findUnique({
                where: {
                    id: req.params.id
                }
            });
    
            if (!existingBook) {
                return res.status(404).json({ message: "Data not found" });
            }
    
            const updatedBook = await prisma.book.update({
                where: {
                    id: req.params.id
                },
                data: {
                    title: req.body.title,
                    author: req.body.author,
                    summary: req.body.summary,
                    price: Number(req.body.price),
                    img: req.body.img,
                    pages: Number(req.body.pages),
                }
            });
    
            res.status(200).json({ data: updatedBook, message: "Data successfully updated" });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                return res.status(404).json({ error: 'Book ID does not exist' });
            }
    
            res.status(500).json({ error: 'An error occurred while trying to update a book' });
        }
    }
}

module.exports = BookController