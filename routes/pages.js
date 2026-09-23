import {Router} from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send(`hi! love ya <3`);
});

router.get('/about', (req, res) => {
  res.send('about page');
});

router.get(`/hello`, (req, res) => {
  res.send(`I am learning how to ignore the guy playing subway surfers. and how to build a web server!`);
});

export default router;
