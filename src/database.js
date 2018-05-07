// @flow
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

import config from './config';

mongoose.connect(config.mongoUri)

const { Schema } = mongoose;

const SourceSchema = new Schema({
  name: String,
  url: String,
  script: String,
  categories: [ String ],
});

const ArticleSchema = new Schema({
  source: { type: Schema.Types.ObjectId, ref: 'Source' },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  url: String,
  title: String,
  content: String,
  background: String,
  categories: [ String ],
  datePosted: Date,
  dateCreated: { type: Date, default: Date.now }
});
ArticleSchema.plugin(mongoosePaginate);

module.exports = {
  Source: mongoose.model('Source', SourceSchema),
  Article: mongoose.model('Article', ArticleSchema)
}
