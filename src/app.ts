//Importa as váriaveis ambiente
import "dotenv/config";

import cors from "cors";

// Importa o módulo que facilita a criação de erros HTTP (como 404, 500, etc)
import createError from "http-errors";

// Importa o Express e os tipos do TypeScript para Request, Response e NextFunction
import express, { Request, Response, NextFunction } from "express";

// Módulo para trabalhar com caminhos de arquivos/diretórios
import path from "path";

// Middleware para parsear cookies
import cookieParser from "cookie-parser";

// Middleware para fazer logs de requisições (como método, status, tempo)
import logger from "morgan";

// Importa os roteadores definidos nos arquivos de rotas
import indexRouter from "./routes/index";

//TSOA
import { RegisterRoutes } from "./routes/routes";
import { ValidateError } from "tsoa";

//Error do express
import { ErrorRequestHandler } from "express";

// Config Swagger para as rotas
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../src/docs/swagger.json";

import cors from 'cors';

// Cria a instância da aplicação Express
const app = express();

// -------- CONFIGURAÇÕES DO SERVIDOR --------

// Define a pasta onde estão os arquivos de views/templates (ex: arquivos Jade/Pug)
app.set("views", path.join(__dirname, "views"));

// Define o motor de visualização (template engine) usado para renderizar as views
app.set("view engine", "jade");

// -------- MIDDLEWARES GLOBAIS --------

app.use(cors());

// Ativa o middleware de log das requisições
app.use(logger("dev"));

// Permite que a aplicação aceite JSON no corpo da requisição
app.use(express.json());

// Permite que a aplicação aceite dados codificados na URL (formulários)
app.use(express.urlencoded({ extended: false }));

// Permite que cookies sejam lidos e interpretados
app.use(cookieParser());

// Define a pasta pública para arquivos estáticos (como CSS, imagens, etc)
app.use(express.static(path.join(__dirname, "public")));

// Ativa o CORS para todas as origens (pode ser configurado depois)
app.use(cors());

// -------- ROTAS --------

//Swagger

function setupSwagger(app: express.Application) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

setupSwagger(app);

RegisterRoutes(app);

// Rota raiz ("/") será tratada pelo indexRouter
// app.use('/', indexRouter)

//Coloquei para ir para api-docs logo quando abre por enquanto(swagger)
app.get("/", (_req, res) => {
  res.redirect("/api-docs");
});

// -------- TRATAMENTO DE ERRO 404 --------

// Quando nenhuma rota acima for atendida, cai aqui e gera um erro 404
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404)); // cria erro e encaminha para o handler de erro
});

// -------- TRATAMENTO DE ERROS GERAIS --------

/* 
  Middleware para lidar com qualquer erro que acontecer. Como estamos usando o Zod e o TSOA
  (que tem os seus erros proprios) precisamos capturar esses erros e tambem conveter de zod 
  para ValidatorError do TSOA em alguns casos.)

*/
import { ErrorHandlerMiddleware } from "./middlewares/ErrorHandlerMiddleware";

app.use(ErrorHandlerMiddleware.handle);

// Exporta o app para ser usado por outro arquivo (ex: server.ts)
export default app;
