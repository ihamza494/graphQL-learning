const { GraphQLObjectType, GraphQLID , GraphQLString, GraphQLList } =require("graphql");
const Author = require('../models/Author');

const BookType = new GraphQLObjectType({
    name: "Book",
    fields:()=>({
        id: { type: GraphQLID},
        title: { type: GraphQLString},
        authorId: { type: GraphQLID},
        author: {
            type: require('./AuthorType'),
            resolve(parent, args){
                return Author.findById(parent.authorId);
            }
        }
    })
});

module.exports = BookType;