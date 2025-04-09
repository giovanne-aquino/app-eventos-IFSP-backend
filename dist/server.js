"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importa a instância do app configurado no arquivo 'app.ts'
const app_1 = __importDefault(require("./app"));
// Importa a função 'debug' para criar logs de desenvolvimento
const debug_1 = __importDefault(require("debug"));
// Importa o módulo HTTP nativo do Node.js, necessário para criar o servidor
const http_1 = __importDefault(require("http"));
// Cria uma instância de logger usando um namespace. Você pode ver logs com `DEBUG=app-eventos-ifsp-backend:* npm run dev`
const debug = (0, debug_1.default)('app-eventos-ifsp-backend:server');
/**
 * Pega a porta do ambiente (se existir) ou usa a 3000 como padrão
 */
const port = normalizePort(process.env.PORT || '3000');
// Configura a porta no app Express, útil para logs ou view engines
app_1.default.set('port', port);
/**
 * Cria o servidor HTTP com base na aplicação Express
 */
const server = http_1.default.createServer(app_1.default);
/**
 * Faz o servidor "ouvir" na porta definida e adiciona os event listeners
 */
server.listen(port); // inicia o servidor na porta
server.on('error', onError); // trata erros que podem ocorrer ao subir
server.on('listening', onListening); // executa quando o servidor está de pé
/**
 * Função para normalizar a porta: converte string para número se possível
 * Exemplo: "3000" → 3000, "pipeName" → "pipeName"
 */
function normalizePort(val) {
    const port = parseInt(val, 10); // tenta converter para número
    if (isNaN(port)) {
        return val; // é uma named pipe
    }
    if (port >= 0) {
        return port; // é um número de porta válido
    }
    return false; // valor inválido
}
/**
 * Função que trata erros ao tentar subir o servidor
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error; // se o erro não for relacionado à porta, lança ele
    }
    // Define uma string de identificação para o erro (pipe ou porta)
    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    // Trata alguns erros comuns ao iniciar servidor
    switch (error.code) {
        case 'EACCES': // permissão negada (ex: tentar rodar na porta 80 sem sudo)
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE': // porta já está sendo usada
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default: // qualquer outro erro
            throw error;
    }
}
/**
 * Função chamada quando o servidor começa a rodar com sucesso
 */
function onListening() {
    const addr = server.address(); // pega endereço do servidor (porta ou named pipe)
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`;
    // Exibe no console (usando debug) em qual porta o servidor está ouvindo
    debug(`Listening on ${bind}`);
}
