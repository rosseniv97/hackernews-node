const { GraphQLServer } = require('graphql-yoga')
const { PrismaClient } = require('@prisma/client')
const { PubSub } = require('graphql-yoga')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Subscription = require('./resolvers/Subscription')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')
const Vote = require('./resolvers/Vote')

const resolvers = {
    Query,
    Mutation,
    Subscription,
    User,
    Link,
    Vote,
}

const prisma = new PrismaClient();
const pubsub = new PubSub();

const server = new GraphQLServer({
    typeDefs: './schema.graphql',
    resolvers,
    context: request => {
        return {
            ...request,
            prisma,
            pubsub,
        }
    }
})
server.start(() => console.log(`Server is running on http://localhost:4000`));