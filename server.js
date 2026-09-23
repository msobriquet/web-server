import express from 'express';
import pagesRouter from './routes/pages.js';
import apiRouter from './routes/api.js';

const app = express();
const PORT = process.env.PORT || 3000;
//const PORT = 4000;

//app.use('/api', apiRouter) mounts the API router at /api.
//the route defined at /info in apiRouter becomes /api/info from the browser's perspective.
//the router file does not need to know its own prefix.

app.use('/', pagesRouter);
app.use('/api', apiRouter);


//unit 2:

//parameters: express captures and stores them in req.params.
//you can have multiple in one path.
//req.params is always an object; convenient to destructure it
app.get(`/hello/:name`, (req, res) => {
  res.send(`Hello, ${req.params.name}!`);
})

//query strings carry key-value pairs.
//express parses it and stores it in req.query
//query strings are optional by nature.
app.get(`/search`, (req, res) => {
  const term = req.query.term || `nothing`;
  const limit = Number.parseInt(req.query.limit) || 5;
  res.send(`searching for "${term}", showing ${limit} results.`);
});

//```res.json()``` serializes the object to JSON, and sets ```Content-Type: application/json```, so the browser and any API client knows what kind of data it recieved.
//we can manually send error codes and chain responses.
app.get(`/api/user/:id`, (req, res) => {
  if (req.params.id != "1") {
    res.status(404).send("user not found");
    return;
  }
  res.json({id: req.params.id, name: 'alice', role: 'admin'});
});

//when go to this route, you will get stack trace with TypeError.
app.get("/broken", (req, res) => {
  const user = undefined;
  res.send(user.name);
})

//--------unit-02 exercises-----------

//GET /repeat/:word responds with the word from the URL repeated three times, separated by spaces.
//for (let i = 0; i < 3; i++) res.send(req.params.word); doesn;t work cause finishes when send resolves.
app.get("/repeat/:word", (req, res) => {
  res.send(`${req.params.word} ${req.params.word} ${req.params.word}`);
})

//GET /count reads a ?from and ?to query parameter and responds with the //sentence Counting from <from> to <to>. Use fallback values of 1 and 10 if the parameters are missing.
app.get("/count", (req, res) => {
  const from = req.query.from || 1;
  const to = req.query.to || 10;
  res.send(`Counting from ${from} to ${to}`)
})

//GET /api/info responds with a JSON object containing at least two fields of your choice.
app.get("/api/info/:date/:food", (req, res) => {
  const {date, food} = req.params;
  res.send(`accessed on ${date} while eating ${food}`);
})

//GET /api/error always responds with status 400 and the message Bad request.
app.get("/api/error", (req, res) => {
  res.status(400).send("Bad Request");
})

app.use((req, res) => {
  res.status(404).send('Page not found.');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
