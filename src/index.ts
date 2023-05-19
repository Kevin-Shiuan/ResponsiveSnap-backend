import express from 'express';
import cors from 'cors';
import verify from './utils/verify.js';
import screenshot from './screen-capture/screenshot.js';

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
  res.send(
    'This is the backend server for responsive-snap, which is a Figma plugin for you to take screenshots of a webpage in different screen sizes. You can visit the page https://www.figma.com/community/plugin/1205868823812750536 to learn more.'
  );
});

app.get('/server-status', (req, res) => {
  console.log('server status: running');
  res.set('Access-Control-Allow-Origin', '*');
  res.send(JSON.stringify({ msg: 'Server is running!' }));
});

app.post('/snap', async (req, res) => {
  if (!verify(req)) {
    console.log('\nDenying access of: ');
    console.log(req.body);
    return res.send(JSON.stringify({ msg: 'Access denied!' }));
  }
  // console.log('Access allowed');
  // const data = await snapOne(req.body);
  const data = await screenshot(req.body);
  // const newData = { ...data, snap_data: snap_data };
  res.set('Access-Control-Allow-Origin', '*');
  res.send(JSON.stringify(data));
});
