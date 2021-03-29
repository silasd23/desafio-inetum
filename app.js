const express = require('express');
const proxyRouter = require('./routes/proxyRouter');
const bodyParser = require('body-parser');
const http = require('http');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.use((req, res, next) => {
  /*frontend is using ODatamodels to handle requests.
  This header needs to be set, otherwise UI5 will not accept the response as a valid OData response*/
  res.set('dataserviceversion', '2.0');
  next();
});
app.use('/currencyConverter', proxyRouter);
app.use((err, req, res, next) => {
  if (err.response) {
    return res.status(err.response.status).send(err.response.data);
  } else if (err.request) {
    return res.status(504).send(err.request);
  } else {
    return res.status(500).send(err.stack);
  }
})

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})