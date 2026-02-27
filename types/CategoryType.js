const { GraphQLObjectType, GraphQLID , GraphQLString, GraphQLList } =require("graphql");
const Category = require("../models/Category");
const CategoryType = new GraphQLObjectType({
    name: "Category",
    fields:()=>({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        parentCategory: {
            type: CategoryType,
            async resolve(parent,args){
                return await parent.parentCategory? Category.findById(parent.parentCategory) : null;
            }
        },
        subCategories: {
            type: new GraphQLList(CategoryType),
            async resolve(parent,args){
                return await Category.find({ parentCategory: parent.id });
            }
        }
    })
});

module.exports = CategoryType;