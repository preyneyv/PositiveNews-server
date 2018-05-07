// @flow
import type from 'express';
import {Article} from '../database';

export async function fetch(req: express$Request, res: express$Response) {
  // Fetch a listing of articles (for homepage)
  let limit: number = parseInt(req.query.articles || 10); // how many articles?
  let page: number = parseInt(req.query.page || 1); // which page?
  if (page < 1) return res.status(400).send({success: false, messsage: 'page_lt_0'})

  let date: Date = new Date(req.query.date);
  if (isNaN(date.getTime())) date = new Date;

  let result: Object;
  try {
    result = await Article.paginate({
      dateCreated: {$lt: date}
    }, {
      page,
      limit,
      select: '-content',
      sort: {'dateCreated': 'desc'},
      populate: 'source',
    })
  } catch(e) {
    res.status(500).send({success: false, message: 'unexpected'});
    throw e;
  }
  let articles: [Article] = result.docs;
  res.send({
    articles, date,
    success: true
  })
}

export async function show(req: express$Request, res: express$Response) {
  // Given an article id, fetch the article's content
  let id = req.query.id;
  let article: Article
  try {
    article = await Article.findById(id);
  } catch (e) {
    res.status(500).send({success: false, message: 'unexpected'});
    throw e;
  }
  if (article)
    res.status(200).send({success: true, article});
  else
    res.status(404).send({success: false, message: 'article_not_found'});
}
