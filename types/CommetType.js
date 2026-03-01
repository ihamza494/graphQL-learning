const { GraphQLObjectType, GraphQLID , GraphQLString, GraphQLList } =require("graphql");


const CommentType = new GraphQLObjectType({
    name: "Comment",
    fields:()=>({
        id: { type: GraphQLID},
        comment: { type: GraphQLString},
        commentTableId: { type: GraphQLID}
            })
});

module.exports = CommentType;