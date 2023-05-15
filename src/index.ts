import express from 'express';
import cors from 'cors';
import snapOne from './screenshot.js';
import verify from './verify.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}, http://localhost:${PORT}`);
});

// enable pre-flight across-the-board
app.options('*', cors());

app.get('/', (req, res) => {
  console.log('get request: /');
  res.set('Access-Control-Allow-Origin', '*');
  res.send('Server is running!');
});

app.get('/serverStatus', (req, res) => {
  console.log('get request: /serverStatus');
  res.set('Access-Control-Allow-Origin', '*');
  res.send(JSON.stringify({ msg: 'Server is running!' }));
});

// app.post('/', async (req, res) => {
//   if (!verify(req)) return res.send('Access granted and denied!');
//   // console.log('Access allowed');
//   res.set('Access-Control-Allow-Origin', '*');
//   const data = await snapMultiple(req.body);
//   res.send(JSON.stringify(data));
// });

app.post('/snap', async (req, res) => {
  if (!verify(req)) return res.send('Access granted and denied!');
  // console.log('Access allowed');
  const data = await snapOne(req.body);
  res.set('Access-Control-Allow-Origin', '*');
  res.send(JSON.stringify(data));
});
