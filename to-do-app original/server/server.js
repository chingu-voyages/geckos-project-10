import React from 'react';
import App from '../src/App.js';
import { renderToString } from 'react-dom/server';
import fs from 'fs';
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '/../public')));

// app.get('/', function (req, res) {
//  return res.send('./public/index.html');
// });

app.get('/', function (req, res) {
  const appString = renderToString(<App />);

  const indexFile = path.resolve('../to-do-app original/public/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${appString}</div>`)
    );
  });
  // res.sendFile(path.join(__dirname, '/../public', 'index.html'));

  // res.send(index({
  //   body: appString,
  //   title: 'Hello World from the server',
  // }))
});

app.listen(8080);
console.log('Node server running on port 8080');  
