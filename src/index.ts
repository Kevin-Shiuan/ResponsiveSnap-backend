import express from 'express';
import cors from 'cors';
import expressQueue from 'express-queue';
import verify from './utils/verify';
import screenshot from './screen-capture/screenshot';

const app = express();
const PORT = process.env.PORT || 4000;
const lineUp = expressQueue({ activeLimit: 1, queuedLimit: 50 });

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(lineUp);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}, http://localhost:${PORT}`);
});

// enable pre-flight across-the-board
app.options('*', cors());

app.get('/', (req, res) => {
  console.log('get request: /');
  res.set('Access-Control-Allow-Origin', '*');
  res.send(
    JSON.stringify({
      message:
        'Welcome to the backend server for ResponsiveScreenshot! ResponsiveScreenshot is a Figma plugin designed to help you capture screenshots of webpages across various screen sizes. To learn more and start using the plugin, visit our Figma community page: https://www.figma.com/community/plugin/1205868823812750536.',
    })
  );
});

app.get('/server-status', (req, res) => {
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const userAgent = req.get('User-Agent');
  console.log(`Server status checked by IP: ${clientIp}, User-Agent: ${userAgent}`);

  res.set('Access-Control-Allow-Origin', '*');
  res.send(JSON.stringify({ message: 'server is running' }));
});

app.post('/snap', async (req, res) => {
  if (!verify(req)) {
    console.log('\nDenying access for:', req.body);
    res.set('Access-Control-Allow-Origin', '*');
    return res.status(403).json({ error: 'You are not a verified Figma user.' });
  }
  const data = await screenshot(req.body);
  res.set('Access-Control-Allow-Origin', '*');
  res.send(JSON.stringify(data));
});
