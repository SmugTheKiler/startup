const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const waitlistDataFile = './waitlist-data.json';

app.post('/submit', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  const waitlistData = {
    name: name,
    email: email,
    message: message,
    timestamp: new Date().toISOString(),
  };

  fs.readFile(waitlistDataFile, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      const waitlist = JSON.parse(data);
      waitlist.push(waitlistData);
      fs.writeFile(waitlistDataFile, JSON.stringify(waitlist), (err) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});