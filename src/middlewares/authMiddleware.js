//oq esse cara faz? toda vez que houver uma requisição para rota, ele vai verificar se o Token existe e é válido
// se sim, ele libera acesso, se não, da Http 401

const jwt = require("jsonwebtoken");

const verify = {
    cliente: async (req, res, next) => {
        try {
            const {token} =  req.cookies;
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
                if (!decoded.tipoUsuario || decoded.tipoUsuario !== "cliente") {
                    return res.status(403).json({erro: "Acesso permitido somento para clientes"});
                };

                req.cliente = {
                    idCliente: decoded.idCliente,
                    nomeCliente: decoded.nomeCliente
                };

                next();
        } catch (error) {
            console.error("Erro ao verificar token:", error);
            return res.status(401).json({erro: "Token inválido ou expirado!"})
        }        
    }
};

module.exports = { verify };