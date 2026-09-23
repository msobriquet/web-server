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

app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/about', (req, res) => {
  res.render("about", {title: "About"});
})

app.use((req, res) => {
  res.status(404).send('Page not found.');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
