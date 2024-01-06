const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const books = [
    {
        title: "Trigun Maximun",
        author: "Yasuhiro Nightow", 
        summary: "Set on the fictional planet known as No Man's Land, the plot follows Vash the Stampede, a famous gunman who is constantly fighting bounty hunters seeking to obtain the immense bounty on his head. As the narrative progresses, Vash's past is explored. Trigun originated from Nightow's fascination with Western movies. Nightow wanted Vash to be different from cowboys in Western movies by avoiding killing enemies and instead exploring the characters involved in each story arc.",
        price: 49,
        img: "https://m.media-amazon.com/images/I/51BtNvTEzaL._AC_UF1000,1000_QL80_.jpg",    
        pages: 192
    },
    {
        title: "This is How You Lose the Time War",
        author: "Amal El-Mohtar", 
        summary: "As agents Red and Blue travel back and forth through time, altering the history of multiple universes on behalf of their warring empires, they leave each other secret messages — at first taunting, but gradually developing into flirtation then love.",
        price: 10,
        img: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1653185078i/43352954.jpg",    
        pages: 209
    },
    {
        title: "The Alchemist",
        author: "Paulo Coelho", 
        summary: "An Andalusian shepherd boy named Santiago travels from his homeland in Spain to the Egyptian desert in search of a treasure buried in the Pyramids. He is both a simple sheep herder and an ambitious explorer. He follows his dreams, literally, a well as “signs” from his environment.",
        price: 14,
        img: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1654371463i/18144590.jpg",    
        pages: 163
    }
]

async function main() {
    
    books.forEach(async (book) => {
        await prisma.book.create({
            data: book
        })
    })

    console.log("Seeder run succesfully")
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })