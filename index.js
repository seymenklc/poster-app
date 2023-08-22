const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
require('dotenv').config();

const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/typeDefs');

const server = new ApolloServer({
    resolvers,
    typeDefs,
    context: (req) => req
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(async () => {
        console.log('MongoDB connected!');
        return server.listen({ port: process.env.PORT })
            .then(res => console.log(`Server running at: ${res.url}`));
    });