const { GraphQLObjectType, GraphQLID , GraphQLString, GraphQLList } =require("graphql");


const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields:()=>{
        const Book = require("../models/Book");
        return {
        id: { type: GraphQLID},
        name: { type: GraphQLString},
        books:{
            type: new GraphQLList(require("./BookType")),
            resolve(parent,args){
                return Book.find({authorId: parent.id});
                }
            }
    }
}
});

module.exports = AuthorType;