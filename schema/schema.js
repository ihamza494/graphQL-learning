const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt }=require("graphql");

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

const users = [
                    { id: '1', name: "sandeep", age: 25},
                    { id: '2', name: "jaideep", age: 23},
                    { id: '3', name: "prandeep", age: 29}
                ];


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
        user:{
            type: userType,
            args:{ id:  { type: GraphQLString }},
            resolve(parent, args){
                console.log(users);
                return users.find(user => user.id === args.id);
            }
        },
        hello:{
            type: GraphQLString,
            resolve(){   //returns data , brain of graphQL backend , decide from where data comes
                return 'Hello From GraphQL';
            }
        },
        greeting:{
            type: GraphQLString,
            resolve(){
                return 'Ramadan Mubarak';
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
            resolve(parent, args){
                const userObj = {
                    id: users.length + 1+"",
                    name: args.name,
                    age: args.age
                }

                users.push(userObj);
                console.log(users);
                return userObj;
            }
        },
        updateUser:{
            type: userType,
            args: {
                id: {type:GraphQLString},
                name: {type:GraphQLString},
                age: { type: GraphQLInt}
            },
            resolve(parent, args){
                const userObj = users.find(u=>u.id=== args.id);
                if(userObj){
                    userObj.name=args.name || userObj.name;
                    userObj.age=args.age || userObj.age;
                    console.log(users);
                    return userObj;  
                }
                throw new Error("User not Found!");
                
                }
        },
        deleteUser:{
            type: userType,
            args: {
                id: {type:GraphQLString}
            },
            resolve(parent, args){
                const userIndex = users.findIndex(u=>u.id=== args.id);
                if(userIndex === -1)throw new Error("User not Found!");
                return users.splice(userIndex,1)[0];
                
                }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: MutationObj
}); 
