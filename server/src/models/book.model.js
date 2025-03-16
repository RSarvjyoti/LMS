const {Schema, model} = require("mongoose");

const bookSchema = new Schema(
    {
        title: {type : String},
        author: {type : String},
        genre: {type : String},
        year: {type : Number},
        description: {type : String},
        photo : {type : String}
    }, {
        timestamps : true
    }
)

const Book = model("books", bookSchema);

module.exports = Book