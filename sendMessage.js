const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fetch = require('node-fetch');

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
    console.log('Cliente do WhatsApp Web está pronto e autenticado!');
});

// Evento chamado quando há erro
client.on('auth_failure', () => {
    console.error('Falha na autenticação. Verifique o QR code e tente novamente.');
});

client.on('disconnected', (reason) => {
    console.log(`Cliente desconectado: ${reason}. Reconeção será tentada.`);
});

// Inicia o cliente
client.initialize();

const sites = [
    { url: 'https://www.google.com.br', name: 'Google' },
    { url: 'https://www.instagram.com', name: 'Instagram' },
    { url: 'http://192.168.18.1:8010', name: 'Site que eu sei que está OFF' },
    { url: 'http://192.168.15.7:3001', name: 'Show do Milhão' }
];
const proxyUrl = 'https://api.allorigins.win/get?url=';

// Armazena o último tempo em que uma mensagem foi enviada para cada site
const lastMessageTime = {};

// Função para enviar mensagem de alerta
function sendAlert(siteName, errorMessage) {
    const number = '5562993603737@c.us'; // Número do destinatário
    const message = `🚨 **ALERTA:** O site ${siteName} está fora do ar! 🚨

Detalhes do erro: ${errorMessage}

Verifique a situação e tome as ações necessárias.`;

    client.sendMessage(number, message).then(response => {
        console.log(`Mensagem enviada: ${message}`);
        lastMessageTime[siteName] = Date.now(); // Atualiza o tempo da última mensagem enviada
    }).catch(err => {
        console.error(`Erro ao enviar mensagem: ${err.message}`);
    });
}

// Função para verificar o status de um site
function checkStatus(site) {
    fetch(proxyUrl + encodeURIComponent(site.url))
        .then(response => {
            if (!response.ok) {
                throw new Error(`Status ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const status = data.contents ? 'online' : 'offline';
            const currentTime = Date.now();
            const lastTime = lastMessageTime[site.name] || 0;

            if (status === 'offline') {
                if ((currentTime - lastTime) >= 5 * 60 * 1000) { // Verifica se se passaram 5 minutos
                    sendAlert(site.name, 'fora do ar');
                }
            } else {
                // Se o site está online, você pode resetar o tempo de envio para o site
                delete lastMessageTime[site.name];
            }
        })
        .catch(err => {
            const currentTime = Date.now();
            const lastTime = lastMessageTime[site.name] || 0;

            if ((currentTime - lastTime) >= 5 * 60 * 1000) { // Verifica se se passaram 5 minutos
                sendAlert(site.name, `Erro ao acessar o site: ${err.message}`);
            }
            console.error(`Erro ao verificar o site ${site.name}: ${err.message}`);
        });
}

// Função para monitorar os sites
function monitorSites() {
    sites.forEach(site => {
        checkStatus(site);
    });
}

// Inicia o monitoramento dos sites
monitorSites();

// Verifica o status dos sites a cada 10 segundos
setInterval(() => {
    monitorSites();
}, 10000);

// Rota para enviar mensagem manualmente
app.get('/send-message', (req, res) => {
    const number = '5562993603737@c.us'; // Número do destinatário
    const message = `🚨 **ALERTA:** O site está fora do ar! 🚨

Detalhes: O site está temporariamente indisponível. Verifique a situação e tome as ações necessárias.`;

    client.sendMessage(number, message).then(response => {
        res.send('Mensagem enviada com sucesso!');
    }).catch(err => {
        res.status(500).send(`Erro ao enviar mensagem: ${err.message}`);
    });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}.`);
});
