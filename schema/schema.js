const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLInputObjectType, GraphQLNonNull }=require("graphql");

const User = require('../models/User');

const UserInputType = new GraphQLInputObjectType({
    name: 'UserInput',
    fields: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: {  type: GraphQLInt }
    }
});

const deviceType = new GraphQLObjectType({
    name:"Device",
    fields:{
        id:{type: GraphQLString},
        name:{type: GraphQLString},
        generation:{type: GraphQLString},
        ram:{type: GraphQLString},
        ssd:{type: GraphQLString},
        os:{type: GraphQLString}
    }
});


const userType = new GraphQLObjectType({
    name:"User",
    fields:{
        id:{
            type: GraphQLString,

        },
        name:{
            type: GraphQLString,
            
        },
        age:{
            type: GraphQLInt,
            
        }
    }
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        users:{
            type: new GraphQLList(userType),
            resolve( parent, args){
                return User.find();
            }
        },
        userById:{
            type: userType,
            args:{ id: { type: GraphQLString }},
            resolve(parent, args){
                return User.findById(args.id);
            }
        }
    }
});

//mutation logic
const MutationObj = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addUser:{
            type: userType,
            args: {
               input: { type: UserInputType }
            },
            async resolve(_, { input }){

                if(!input.name || input.name.length < 3){
                    throw new Error("Name must be atleast 3 characters.")
                }

               const user = new User({
                name: input.name,
                age: input.age
               });
               return await user.save();

            }
        },
        updateUser:{
            type: userType,
            args: {
                id: {type:GraphQLString},
                name: {type:GraphQLString},
                age: { type: GraphQLInt}
            },
            async resolve(parent, args){
                return await User.findByIdAndUpdate(
                    args.id,
                    { name: args.name, age: args.age },
                    { new: true}
                );
                
                }
        },
        deleteUser:{
            type: userType,
            args: {
                id: {type:GraphQLString}
            },
            async resolve(parent, args){
                return await User.findByIdAndDelete(
                    args.id
                );
                
                }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: MutationObj
}); 
