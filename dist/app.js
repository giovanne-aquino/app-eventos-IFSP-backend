"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importa o módulo que facilita a criação de erros HTTP (como 404, 500, etc)
const http_errors_1 = __importDefault(require("http-errors"));
// Importa o Express e os tipos do TypeScript para Request, Response e NextFunction
const express_1 = __importDefault(require("express"));
// Módulo para trabalhar com caminhos de arquivos/diretórios
const path_1 = __importDefault(require("path"));
// Middleware para parsear cookies
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// Middleware para fazer logs de requisições (como método, status, tempo)
const morgan_1 = __importDefault(require("morgan"));
//TSOA
const routes_1 = require("./routes/routes");
const tsoa_1 = require("tsoa");
// Config Swagger para as rotas
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("../src/docs/swagger.json"));
// Cria a instância da aplicação Express
const app = (0, express_1.default)();
// -------- CONFIGURAÇÕES DO SERVIDOR --------
// Define a pasta onde estão os arquivos de views/templates (ex: arquivos Jade/Pug)
app.set('views', path_1.default.join(__dirname, 'views'));
// Define o motor de visualização (template engine) usado para renderizar as views
app.set('view engine', 'jade');
// -------- MIDDLEWARES GLOBAIS --------
// Ativa o middleware de log das requisições
app.use((0, morgan_1.default)('dev'));
// Permite que a aplicação aceite JSON no corpo da requisição
app.use(express_1.default.json());
// Permite que a aplicação aceite dados codificados na URL (formulários)
app.use(express_1.default.urlencoded({ extended: false }));
// Permite que cookies sejam lidos e interpretados
app.use((0, cookie_parser_1.default)());
// Define a pasta pública para arquivos estáticos (como CSS, imagens, etc)
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// -------- ROTAS --------
//Swagger 
function setupSwagger(app) {
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
}
setupSwagger(app);
(0, routes_1.RegisterRoutes)(app);
app.use((err, _req, res, _next) => {
    console.error("🔥 ERRO GLOBAL:", err);
    res.status(err.status || 500).json({
        message: err.message,
        details: err?.body || err,
    });
});
// Rota raiz ("/") será tratada pelo indexRouter
// app.use('/', indexRouter)
//Coloquei para ir para api-docs logo quando abre por enquanto(swagger)
app.get('/', (_req, res) => {
    res.redirect('/api-docs');
});
// -------- TRATAMENTO DE ERRO 404 --------
// Quando nenhuma rota acima for atendida, cai aqui e gera um erro 404
app.use((req, res, next) => {
    next((0, http_errors_1.default)(404)); // cria erro e encaminha para o handler de erro
});
// -------- TRATAMENTO DE ERROS GERAIS --------
// Middleware para lidar com qualquer erro que acontecer
const errorHandler = (err, req, res, _next) => {
    const isDev = req.app.get('env') === 'development';
    if (err instanceof tsoa_1.ValidateError) {
        return void res.status(err.status || 422).json({
            success: false,
            message: err.message,
            details: err.fields,
        });
    }
    return void res.status(err.status || 500).json({
        success: false,
        message: 'Erro interno no servidor',
        ...(isDev && { stack: err.stack }),
    });
};
app.use(errorHandler);
// Exporta o app para ser usado por outro arquivo (ex: server.ts)
exports.default = app;
