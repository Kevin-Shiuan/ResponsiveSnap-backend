import cron from 'node-cron';
import { exec } from 'child_process';

const url = 'https://responsive-snap.onrender.com'

const cronJob = cron.schedule('*/10 * * * *', () => {
//   console.log('running a task every minute');
  exec(`ping -c 3 ${url}`, function (err, stdout, stderr) {
    console.log('pinging localhost every 10 minutes');
});
}, {
  scheduled: false
});

export default cronJob;