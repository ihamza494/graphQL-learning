const { GraphQLObjectType, GraphQLID , GraphQLString, GraphQLList } =require("graphql");

const Author = require("../models/Author");
const Category = require("../models/Category");
const CategoryType = require("./CategoryType");
const BookType = new GraphQLObjectType({
    name: "Book",
    fields:()=>{
        const AuthorType = require("../types/AuthorType");
        return{
        id: { type: GraphQLID},
        title: { type: GraphQLString},
        authorId: { type: GraphQLID},
        author:{
            type: AuthorType,
            resolve(parent,args){
                return Author.findById(parent.authorId);
            }
        },
        Categories:{
            type: new GraphQLList(CategoryType),
            async resolve(parent,args){
                return await Category.find({ _id: { $in: parent.categoryId } });
            }
        }
    }   
}

});

module.exports = BookType;