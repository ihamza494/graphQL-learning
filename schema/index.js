const { 
    GraphQLObjectType, 
    GraphQLID , 
    GraphQLString, 
    GraphQLList,
    GraphQLSchema,
    GraphQLInt,
    GraphQLNonNull
     } =require("graphql");

const AuthorType = require('../types/AuthorType');
const BookType = require('../types/BookType');
const BookPaginationType = require('../types/BookPaginationType');
const Author = require('../models/Author');
const Book = require('../models/Book');
const AuthorPaginationType = require("../types/AuthorPaginationType");
const Category = require("../models/Category");
const CategoryType = require("../types/CategoryType");

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
                authorId: { type: GraphQLID},
                categoryId: { type: new GraphQLList(GraphQLID) }
            },
            resolve(parent,args){
                const book= new Book({ 
                                title: args.title,
                                authorId: args.authorId,
                                categoryId: args.categoryId
                                });
                return book.save();
            }
        },
        addCategory: {
            type: CategoryType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(parent,args){
                // Check if category already exists (case-sensitive).
                const existing = await Category.findOne({ name: args.name });
                if (existing) {
                    throw new Error("Category already exists");
                }
                const category = new Category({ name: args.name });
                return await category.save();
            }
        }
    }
});

const RootQuery = new GraphQLObjectType({
    name:"RootQueryType",
    fields:{
        authors:{
            type: AuthorPaginationType,
            args:{
                page: { type: GraphQLInt },
                name: { type: GraphQLString }
            },
            async resolve(parent,args){
                const page = args.page || 1;
                const limit = 2;
                const offset = (page - 1) * limit;
                const filter = {};
                if (args.name) {
                    filter.name = args.name;
                }
                const totalCount = await Author.countDocuments(filter);
                const totalPages = Math.ceil(totalCount / limit);
                const hasNextPage = page < totalPages;
                const hasPreviousPage = page > 1;
                return {
                    authors: await Author.find(filter).skip(offset).limit(limit),
                    totalPages,
                    currentPage: page,
                    hasNextPage,
                    hasPreviousPage
                };
            }
        },

        books:{
            type: BookPaginationType,
            args:{
                page: { type: GraphQLInt },
                authorId: { type: GraphQLID }
            },
            async resolve(parent,args){
                const page = args.page || 1;
                const limit = 2;
                const offset = (page - 1) * limit;
                const filter = {};
                if (args.authorId) {
                    filter.authorId = args.authorId;
                }

                const totalCount = await Book.countDocuments(filter);
                const totalPages = Math.ceil(totalCount / limit);
                const hasNextPage = page < totalPages;
                const hasPreviousPage = page > 1;
                return {
                    books: await Book.find(filter).skip(offset).limit(limit),
                    totalPages,
                    currentPage: page,
                    hasNextPage,
                    hasPreviousPage
                };
            }
        },
        category:{
            type: CategoryType,
            args:{ id: { type: GraphQLID }},
            async resolve(parent,args){
                return await Category.findById(args.id);
            }
        },
        categories:{
            type: new GraphQLList(CategoryType),
            async resolve(parent,args){
                return await Category.find({});
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

