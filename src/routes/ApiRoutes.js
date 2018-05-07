// @flow
import { Router } from 'express';
import type from 'express';
import * as ArticleController from '../controllers/ArticleController';

module.exports = (): express$Router => {
  let router = new Router();
  router.get('/fetch/', ArticleController.fetch)
  return router;
}
