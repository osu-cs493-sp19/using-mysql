const express = require('express');
const bodyParser = require('body-parser');

const logger = require('./lib/logger');

const app = express();
const port = process.env.PORT || 8000;

const { validateAgainstSchema } = require('./lib/validation');
const { LodgingSchema, getLodgingsPage } = require('./models/lodging');
const lodgings = require('./lodgings');

app.use(bodyParser.json());

app.use(logger);

app.get('/lodgings', async (req, res) => {
  try {
    const lodgingsPage = await getLodgingsPage(parseInt(req.query.page) || 1);
    res.status(200).send(lodgingsPage);
  } catch (err) {
    console.error(" -- Error:", err);
    res.status(500).send({
      error: "Error fetching lodgings page.  Try again later."
    });
  }
});

/*****************************************************************************
 ** Note that the API endpoints below have not been modified to use MySQL.
 ** They only use in-memory/JSON data.  See the course notes for this topic
 ** for more about how to convert these endpoints to use MySQL.
 *****************************************************************************/

app.post('/lodgings', (req, res) => {
  if (validateAgainstSchema(req.body, LodgingSchema)) {
    lodgings.push(req.body);
    const id = lodgings.length - 1;
    res.status(201).send({
      id: id
    });
  } else {
    res.status(400).send({
      err: "Request body does not contain a valid Lodging."
    });
  }
});

app.get('/lodgings/:id', (req, res, next) => {
  const id = req.params.id;
  if (lodgings[id]) {
    res.status(200).send(lodgings[id]);
  } else {
    next();
  }
});

app.put('/lodgings/:id', (req, res, next) => {
  const id = req.params.id;
  if (lodgings[id]) {
    if (validateAgainstSchema(req.body, LodgingSchema)) {
      lodgings[id] = req.body;
      res.status(204).send();
    } else {
      res.status(400).send({
        err: "Request body does not contain a valid Lodging."
      });
    }
  } else {
    next();
  }
});

app.delete('/lodgings/:id', (req, res, next) => {
  const id = req.params.id;
  if (lodgings[id]) {
    lodgings[id] = null;
    res.status(204).send();
  } else {
    next();
  }
});

app.use('*', (req, res, next) => {
  res.status(404).send({
    err: "The path " + req.originalUrl + " doesn't exist"
  });
});

app.listen(port, () => {
  console.log("== Server is listening on port:", port);
});
