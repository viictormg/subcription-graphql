const {gql} = require('apollo-server');

const typeDefs = gql`
   
    type Auth {
        token : String
        accionante : String
    }
    type Pedido {
        servicioId : String        
        direccionOrigen : String         
        direccionDestino : String
        observacion : String         
        contacto : String         
        telefonoDestino : String         
        distancia : String        
        valor : String  
    }
    input AuthInput {
        usuario : String
        clave : String
    }
    type RespuestaApi {
        status : String
        message : String
    }
    input DatosPedido {
        pedidoId : Int
        estadoId : Int
        mensajeroId : Int
    }
    type RespuestaPedidos {
        status : String
        message : String
        pedidos : [Pedido]
    }

    type Query {
        listarPedidos : RespuestaPedidos
        autenticarUsuario(AuthInput: AuthInput!) : Auth
    }

    type Mutation {
        crearPedido(id : String!)  : RespuestaApi
        actualizarPedido(DatosPedido : DatosPedido) : RespuestaApi
    } 
    type Subscription {
        listarPedidos : RespuestaPedidos
    }
`

module.exports = {
    typeDefs
}