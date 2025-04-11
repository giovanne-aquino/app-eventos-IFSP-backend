// Importa a instância do app configurado no arquivo 'app.ts'
import app from './app'

// Importa a função 'debug' para criar logs de desenvolvimento
import debugLib from 'debug'

// Importa o módulo HTTP nativo do Node.js, necessário para criar o servidor
import http from 'http'

// Cria uma instância de logger usando um namespace. Você pode ver logs com `DEBUG=app-eventos-ifsp-backend:* npm run dev`
const debug = debugLib('app-eventos-ifsp-backend:server')

/**
 * Pega a porta do ambiente (se existir) ou usa a 3000 como padrão
 */
const port = normalizePort(process.env.PORT || '3000')

// Configura a porta no app Express, útil para logs ou view engines
app.set('port', port)

/**
 * Cria o servidor HTTP com base na aplicação Express
 */
const server = http.createServer(app)

/**
 * Faz o servidor "ouvir" na porta definida e adiciona os event listeners
 */
server.listen(port, () => {
  console.log(`\n  ============================ \n SERVER STARTED ON PORT:  ${port} \n  ============================ 
 If you are executing on local, you should put on browser something like: \n http://localhost:${port}/ (CTRL + click to open)\n `)  
})
server.on('error', onError) // trata erros que podem ocorrer ao subir


/**
 * Função para normalizar a porta: converte string para número se possível
 * Exemplo: "3000" → 3000, "pipeName" → "pipeName"
 */
function normalizePort(val: string): number | string | false {
  const port = parseInt(val, 10) // tenta converter para número

  if (isNaN(port)) {
    return val // é uma named pipe
  }

  if (port >= 0) {
    return port // é um número de porta válido
  }

  return false // valor inválido
}

/**
 * Função que trata erros ao tentar subir o servidor
 */
function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') {
    throw error // se o erro não for relacionado à porta, lança ele
  }

  // Define uma string de identificação para o erro (pipe ou porta)
  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

  // Trata alguns erros comuns ao iniciar servidor
  switch (error.code) {
    case 'EACCES': // permissão negada (ex: tentar rodar na porta 80 sem sudo)
      console.error(`${bind} requires elevated privileges`)
      process.exit(1)
      break
    case 'EADDRINUSE': // porta já está sendo usada
      console.error(`${bind} is already in use`)
      process.exit(1)
      break
    default: // qualquer outro erro
      throw error
  }
}


