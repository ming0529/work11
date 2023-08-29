import express from 'express';
import pkg from 'body-parser';
const { json } = pkg;
import { connect } from 'mongoose';

const app = express();

import routes from './routes/index.js';

app.use(json());

app.use(routes.commentsRoutes);
app.use(routes.postsRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        message : 'Not found'
    });
  });

connect('mongodb+srv://121smmmj:UD1gBfhOfHC0RyUJ@cluster1.sgk6bhh.mongodb.net/?retryWrites=true&w=majority')
  .then(result => {
    app.listen(8080);
  })
  .catch(err => {
    console.log(err);
  });

