// @flow
import express from 'express';
import clientSessions from 'client-sessions';

import config from './config';

import ApiRoutes from './routes/ApiRoutes';
import ClientRoutes from './routes/ClientRoutes';

const app = express();

// @flow-ignore-line
app.use(express.json());
// @flow-ignore-line
app.use(express.urlencoded({ extended: true }));

app.use(clientSessions({
  cookieName: 'session',
  secret: config.secret
}));

app.use('/', ClientRoutes());
app.use('/api/', ApiRoutes());

app.listen(config.port, () => console.log(`Listening on port ${config.port}!`));
