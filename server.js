import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.get('/', (req, res) => {
  res.send('Hello, web!');
});

app.get('/about', (req, res) => {
  res.render("about", {title: "About"});
});

app.get('/status', (req, res) => {
  res.json({'status': 'ok', 'uptime': process.uptime()});
});

//looks like any other middleware, but registered last, with no path
app.use((req, res) => {
  res.status(404).send('Page not found.');
});

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
