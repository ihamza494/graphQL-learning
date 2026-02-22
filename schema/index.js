const { 
    GraphQLObjectType, 
    GraphQLID , 
    GraphQLString, 
    GraphQLList,
    GraphQLSchema
     } =require("graphql");

const AuthorType = require('../types/AuthorType');
const BookType = require('../types/BookType');
const Author = require('../models/Author');
const Book = require('../models/Book');

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields:{
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString}
            },
            resolve(parent,args){
                const author= new Author({ name: args.name});
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                title: { type: GraphQLString},
                authorId: { type: GraphQLID}
            },
            resolve(parent,args){
                const book= new Book({ 
                                title: args.title,
                                authorId: args.authorId
                                });
                return book.save();
            }
        },
    }
});

const RootQuery = new GraphQLObjectType({
    name:"RootQueryType",
    fields:{
        authors:{
            type: new GraphQLList(AuthorType),
            resolve(parent,args){
                return Author.find();
            }
        },

        books:{
            type: new GraphQLList(BookType),
            resolve(parent,args){
                return Book.find();
            }
        },
        authorById:{
            type: AuthorType,
            args:{ id: { type: GraphQLID }},
            resolve(parent,args){
                return Author.findById(args.id);
            }
        },
        bookById:{
            type: BookType,
            args:{ id: { type: GraphQLID }},
            resolve(parent,args){
                return Book.findById(args.id);
            }       
    },
    authorByName:{
        type: AuthorType,
        args:{ name: { type: GraphQLString }},
        resolve(parent,args){
            return Author.findOne({name: args.name});
        }       
    }
}
});

module.exports= new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})

