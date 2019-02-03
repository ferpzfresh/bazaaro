const {GraphQLServer} = require('graphql-yoga')
const {Prisma} = require('prisma-binding')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const AuthPayload = require('./resolvers/AuthPayload')

const resolvers = {
    Query,
    Mutation,
    AuthPayload
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    resolverValidationOptions: {
        requireResolversForResolveType: false
    },
    context: req => ({
        ...req,
        db: new Prisma({
            typeDefs: './src/generated/prisma.graphql',
            endpoint: 'https://eu1.prisma.sh/dan-alexandru-dicu-80a227/bazaarodb/dev',
            secret: 'babc6b223194',
            debug: true
        })
    })
})

server.start(() => console.log(`Server is running on port 4000!`))