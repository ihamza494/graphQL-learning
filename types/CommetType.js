const { GraphQLObjectType, GraphQLID , GraphQLString, GraphQLUnionType} =require("graphql");
const PostType = require("./PostType");
const VideoType = require("./VideoType");

const CommentTableData = new GraphQLUnionType({
    name: "CommentTableData",
    types: [PostType, VideoType],
    resolveType(value) {
        if (value.url) {
            return VideoType;
        }
        if (value.content) {
            return PostType;
        }
        return null;
    }
});

const CommentType = new GraphQLObjectType({
    name: "Comment",
    fields:()=>({
        id: { type: GraphQLID},
        comment: { type: GraphQLString},
        commentTableId: { type: GraphQLID},
        commentTableType: { 
            type: GraphQLString
        },
        commentTableData: {
            type: CommentTableData,
            resolve(parent, args) {
                if (parent.commentTableType === 'Post') {
                    return Post.findById(parent.commentTableId);
                }   
                if (parent.commentTableType === 'Video') {
                    return Video.findById(parent.commentTableId);
                }
                return null;
            }
        }
            })
});

module.exports = CommentType;