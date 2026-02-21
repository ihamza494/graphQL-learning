const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList }=require("graphql");

const User = require('../models/User');

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
        device:{
            type: deviceType,
            args:{ id: { type: GraphQLString}},
            resolve(parent, args){
                const devices = [
                    {id: '1', name: 'dell', generation:'11', ram:'12', ssd:'256', os:'win'},
                    {id: '2', name: 'hp', generation:'12', ram:'20', ssd:'256', os:'win'},
                    {id: '3', name: 'lenovo', generation:'8', ram:'12', ssd:'256', os:'win'},
                    {id: '4', name: 'thinkpad', generation:'7', ram:'12', ssd:'256', os:'win'},
                    {id: '5', name: 'intel', generation:'9', ram:'12', ssd:'256', os:'win'},
                ]

                return devices.find(device => device.id === args.id);
            }
        },
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
        },
        user:{
            type: userType,
            args:{ id:  { type: GraphQLString }},
            resolve(parent, args){
                console.log(users);
                return users.find(user => user.id === args.id);
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
                name: {type:GraphQLString},
                age: { type: GraphQLInt }
            },
            async resolve(parent, args){
               const user = new User({
                name: args.name,
                age: args.age
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
