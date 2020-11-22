// const Pedidos = [];
const { consultarPedidosPendientes, actualizarEstadoPedido, nuevoPedido, autenticar } = require('../../services');

const NEW_ORDER = 'NEW_ORDER';

const resolvers = {
	Query: {
		listarPedidos: (_, __, { auth }) => {
			if (auth) {
				return {data} = consultarPedidosPendientes();
			}else{
				return {
					status : "error",
					message : "token invalido"
				};
			}
		},

		autenticarUsuario: async (_, { AuthInput }) => {
			const response = await autenticar(AuthInput.usuario, AuthInput.clave);
			return {
				token: response.token,
				accionante: response.accionante
			};
		}
	},
	Subscription: {
		listarPedidos: {
			subscribe: (_, __, { pubsub, auth }) => pubsub.asyncIterator(NEW_ORDER)
		}
	},
	Mutation: {
		crearPedido: async (_, { id }, { pubsub }) => {
			const { status, message } = await nuevoPedido(id);
			pubsub.publish(NEW_ORDER, {
				listarPedidos: {data} = consultarPedidosPendientes()
			});
			return {
				status,
				message,
			};
		},
		actualizarPedido: async (_, { DatosPedido }, { pubsub, auth }) => {
			if (auth) {
				console.log(DatosPedido);
				const { status, message } = await actualizarEstadoPedido(
					DatosPedido.pedidoId,
					DatosPedido.estadoId,
					DatosPedido.mensajeroId
				);
				pubsub.publish(NEW_ORDER, {
					listarPedidos: {data} = consultarPedidosPendientes()
				});
				return {
					status,
					message
				};
			} else {
				return {
					status: 'ok',
					message: 'token invalido'
				};
			}
		}
	}
};

module.exports = {
	resolvers
};
