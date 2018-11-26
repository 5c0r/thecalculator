import 'reflect-metadata';

import * as express from 'express';
import { createExpressServer } from 'routing-controllers';
import * as path from 'path';
import { IndexController } from './controllers/index.controller';

const uiPath = path.join(__dirname, './../dist');
const portNumber = 3000;
console.log('UI Path', uiPath);

// TODO: Container ?!
const expressServer: express.Application = createExpressServer({});


expressServer.use(express.static(uiPath));
expressServer.listen(portNumber, () => {
    console.log(`Express web server started: http://localhost:${portNumber}`);
    console.log(`Serving content from ${uiPath}`);
});
