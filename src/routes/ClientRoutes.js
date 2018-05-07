// @flow
import { Router } from 'express';
import type from 'express';

module.exports = (): express$Router => {
  let router = new Router();
  router.get('/', (req: express$Request, res: express$Response) => {

  })
  return router;
}
