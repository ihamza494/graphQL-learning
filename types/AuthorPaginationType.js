const { GraphQLObjectType, GraphQLID , GraphQLString, GraphQLList, GraphQLInt, GraphQLBoolean } =require("graphql");

const AuthorPaginationType = new GraphQLObjectType({
   name: "AuthorPagination",
   fields:()=>{
        const AuthorType = require("./AuthorType");
        return{
            authors: { type: new GraphQLList(AuthorType)},
            totalPages: { type: GraphQLInt },
            currentPage: { type: GraphQLInt },
            hasNextPage: { type: GraphQLBoolean },
            hasPreviousPage: { type: GraphQLBoolean },               
        }
   }
});

module.exports = AuthorPaginationType;