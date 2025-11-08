const { clienteModel } = require('../models/clienteModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = {
    clienteLogin: async (req, res) => {
        try {
            const {emailCliente, senhaCliente} = req.body;

            if (emailCliente == undefined || senhaCliente == undefined) {
                return res.status(400).json({erro: 'Email e senha são obrigatorios!'});             
            }
            // Busca no Models (banco de dados, se True pula o If logo abaixo, se false, ele mostra a msg Email n encontrado)
            const result = await clienteModel.buscarPorEmail(emailCliente);

            if (result.length == 0) {
                return res.status(401).json({erro: 'Email não encontrado!'});
            }
            // para iniciar da primeira linha, procurando desde o primeiro cliente no servidor
            const cliente = result[0];
            //usa biblioteca bcrypt para depara de senha cliente (no BD) e a senha recebida
            const senhaValida = await bcrypt.compare(senhaCliente, cliente.senhaCliente);
            //este if se executa apenas se a senha vier como false (entao transforma em True ! < operador NOT e imprime a msg credenciais inv...)
            if (!senhaValida) {
                return res.status(401).json({erro: 'Credenciais inválidas'});
            }

            const payload = {
                idCliente: cliente.idCliente,
                nomeCliente: cliente.nomeCliente,
                tipoUsuario: 'cliente'
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN
            });
            //cookie criado para proteção de XSS
            res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
                maxAge:Number(process.env.JWT_TIME_EXPIRES_IN)
            });

            res.status(200).json({
                message: 'Logado com sucesso!', 
                token
            });
        } catch (error) {
            console.error('Erro no login do cliente:', error);
            res.status(500).json({erro: 'Erro interno no servidor ao realizar login do cliente.'});
        }
        
    }

};

module.exports = {authController};