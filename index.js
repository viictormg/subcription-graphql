const { ApolloServer, PubSub } = require('apollo-server');
const { resolvers } = require('./db/resolvers');
const { typeDefs } = require('./db/schemas');
const { verify } = require('./services');

const pubsub = new PubSub();

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req, res }) => {
		if(req){
			return { 
				req, 
				res,
				pubsub,
				auth : verify(req.headers.authorization, req.headers.accionante)
			}
		}
		else
		{
			return {
				pubsub
			}
		}

	}
});

// Prueba ddd
const PORT = 3001;
server.listen(PORT).then(({ url }) => console.log(`Server runnig in ${url}`));
