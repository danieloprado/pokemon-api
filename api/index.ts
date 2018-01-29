import * as bodyParser from 'body-parser';
import * as express from 'express';

import * as db from './db';
import { allowCors } from './middlewares/allowCors';
import * as errorsMiddlewares from './middlewares/errors';
import { router } from './routes';
import { isDevelopment } from './settings';

const app = express();

app.use(allowCors);
app.use(bodyParser.json());
app.use(router);

app.use(errorsMiddlewares.parser);
app.use(isDevelopment ?
	errorsMiddlewares.developmentError :
	errorsMiddlewares.productionError
);

db.connectAndMigrate().then(() => {
	app.listen(3000, () => console.log('Listening on 3000'));
}).catch(err => console.error(err));
