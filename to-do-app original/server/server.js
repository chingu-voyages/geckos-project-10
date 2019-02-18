// var express = require('express')
// var app = express()
// const path = require('path')
// const port = 4000
// const mysql = require('mysql')
// const con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "root"
//   });

// app.use(express.static(path.resolve(__dirname, '../public')));

// app.get('/', (req, res) => {res.sendFile(path.join(__dirname, '/../public/index.html'))});

// // app.get('/client/index.html', (req,res) => {
// //     var list = ["item1", "item2", "item3"];
// //     res.json(list);
// //     console.log('Sent list of items');
// // });

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))


// // res.sendFile(path.join(__dirname+'/client/index.html'))

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//   });

// //   router.get('/', function(req, res, next) {
// //     connection.query('SELECT * from members', function (error, results, fields) {
// //        if (error) throw error;
// //        res.send(JSON.stringify(results));
// //    });
// // });


//----------------------------------------------------------

import React from 'react';
import index from './src/index.js';
import App from './src/App.js';
import { renderToString } from 'react-dom/server';
const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '/../public')));

// app.get('/', function (req, res) {
//  return res.send('./public/index.html');
// });

app.get('/', function (req, res) {
  const appString = renderToString(<App />);

  // res.sendFile(path.join(__dirname, '/../public', 'index.html'));

  res.send(index({
    body: appString,
    title: 'Hello World from the server',
  }))
});

app.listen(process.env.PORT || 8080);
console.log('Node server running on port 8080');  
