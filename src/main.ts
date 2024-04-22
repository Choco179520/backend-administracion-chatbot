import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import {
  ExpressAdapter,
  NestExpressApplication,
} from "@nestjs/platform-express";
import * as bodyParser from "body-parser";
import * as express from "express";
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from "@nestjs/common";
import * as helmet from "helmet";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { join } from "path";
import {
  CapturarPeticion,
  EncryptInterceptor,
} from "./common/middlewares/capturar-peticion";
import * as fs from "fs";
import * as https from "https";

const httpsOptions = {
  pfx: fs.readFileSync(join(__dirname, "../src/certificates", "servidor.pfx")),
  passphrase: "servidor2023",
};

async function bootstrap() {
  const server = express();
  const logger = new Logger("Server");

  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(server)
  );
  app.setGlobalPrefix("api-backoffice-empresa");

  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
  app.use(
    helmet.hsts({
      maxAge: 31536000,
      preload: true,
      includeSubDomains: true,
    })
  );

  //app.use(CapturarPeticion);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  );

  // const reflector = app.get(Reflector);
  // app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Methods", "GET, POST", "PUT");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
  });

  app.setBaseViewsDir(join(__dirname, "..", "views"));
  app.setViewEngine("ejs");

  app.enableCors();

  /** Configuracion de swagger modulo */
  const configSwagger = new DocumentBuilder()
    .setTitle("API BACKOFFICE IMAKSMART")
    .setDescription(
      "El api es desarrollada por el equipo de DESARROLLO IMAKSMART"
    )
    .setVersion("1.0")
    .build();
  const documentApi = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup("api-backoffice-empresa/documentacion", app, documentApi);

  /** Registra el interceptor para encriptar las respuestas **/
  app.useGlobalInterceptors(new EncryptInterceptor());
  const serverHttps = https.createServer(httpsOptions, server);

  await app.init();
  serverHttps.listen(process.env.PORT || 3001);
  // await app.listen(process.env.PORT ||3001);
  // console.log(app)
  logger.debug(
    `Aplicación de backoffice administracion CHATBOT EPN esta corriendo en el puerto: ${serverHttps.address()["port"]}`
  );
}
bootstrap();
