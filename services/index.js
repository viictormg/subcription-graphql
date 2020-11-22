const axios = require('axios').default;
const { URL_PEDIDOS, URL_MENSAJEROS } = require('../config/index');

const consultarPedidosPendientes = async () => {
	const PedidosAve = await axios.post(URL_PEDIDOS, {
		tipo: 'pedidosPendientes'
	});
	
	return PedidosAve.data;
};

const actualizarEstadoPedido = async (pedidoId, estadoId) => {
	const { data } = await axios.post(URL_PEDIDOS, {
		tipo: 'actualizarEstado',
		estadoId: estadoId,
		pedidoId: pedidoId
	});

	return data;
};

const nuevoPedido = async (id) => {
	const { data } = await axios.post(URL_PEDIDOS, {
		tipo: 'crearPedido',
		id: id
	});

	return data;
};

const autenticar = async (usuario, clave) => {
	const { data } = await axios.post(URL_MENSAJEROS, {
		tipo: 'getToken',
		usuario,
		clave
	});
	return data;
};
const verify = (token, accionante) => {
	// const { data } = await axios.post(URL_MENSAJEROS, {
	// 	tipo: 'getToken',
	// 	usuario,
	// 	clave
	// });
	return true;
};

module.exports = {
	consultarPedidosPendientes,
	actualizarEstadoPedido,
	nuevoPedido,
	verify,
	autenticar
};
