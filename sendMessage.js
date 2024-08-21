const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const app = express();
const port = 3006; // Escolha a porta que você preferir

// Inicializa o cliente com autenticação local
const client = new Client({
    authStrategy: new LocalAuth()
});

// Gera o QR Code para autenticação
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

// Evento chamado quando o cliente estiver pronto
client.on('ready', () => {
    console.log('Cliente está pronto!');
});

// Inicia o cliente
client.initialize();

// Rota para enviar mensagem
app.get('/send-message', (req, res) => {
    const number = '5562993603737@c.us'; // Número do destinatário
    const message = `🚨 **ALERTA:** O site está fora do ar! 🚨

Estamos enfrentando problemas técnicos e o site está temporariamente indisponível. Nossa equipe já está trabalhando para resolver a situação o mais rápido possível. Agradecemos sua compreensão e paciência.

Para mais informações, por favor, entre em contato com nosso suporte.`;

    client.sendMessage(number, message).then(response => {
        res.send('Mensagem enviada com sucesso!');
    }).catch(err => {
        res.status(500).send('Erro ao enviar mensagem: ' + err);
    });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
