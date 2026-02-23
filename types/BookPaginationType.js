const { GraphQLObjectType, GraphQLID , GraphQLString, GraphQLList, GraphQLInt, GraphQLBoolean } =require("graphql");

const BookPaginationType = new GraphQLObjectType({
   name: "BookPagination",
   fields:()=>{
        const BookType = require("./BookType");
        return{
            books: { type: new GraphQLList(BookType)},
            totalPages: { type: GraphQLInt },
            currentPage: { type: GraphQLInt },
            hasNextPage: { type: GraphQLBoolean },
            hasPreviousPage: { type: GraphQLBoolean },               
        }
   }
});

module.exports = BookPaginationType;