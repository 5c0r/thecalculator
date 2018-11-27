import 'reflect-metadata';

import * as express from 'express';
import * as path from 'path';

import { createExpressServer, useContainer } from 'routing-controllers';
import { Container } from "typedi";

useContainer(Container);

import { IndexController } from './controllers/index.controller';
import { GoogleInstance } from './service/google-main.service';

const uiPath = path.join(__dirname, './../dist');
const portNumber = 3000;

// This instance should be now singleton ?
Container.get(GoogleInstance);

// TODO: Container ?!
const expressServer: express.Application = createExpressServer({
    controllers: [IndexController]
});

expressServer.use(express.static(uiPath));
expressServer.listen(portNumber, () => {
    console.log(`Express web server started: http://localhost:${portNumber}`);
    console.log(`Serving content from ${uiPath}`);
});
