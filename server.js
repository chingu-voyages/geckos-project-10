import React from "react";
import App from "./src/App.js";
import { renderToString } from "react-dom/server";
import StyleContext from "isomorphic-style-loader/StyleContext";
import { SheetsRegistry } from "jss";
import JssProvider from "react-jss/lib/JssProvider";
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName
} from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import yellow from "@material-ui/core/colors/yellow";

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const methodOverride = require("method-override");
const http = require("http");
const cron = require("node-cron");
const TaskDB = require("./database/database.js");
const schedulerFactory = require("./schedulerFactory.js");
const port = process.env.PORT || 3000;

// const accountSid = 'AC019a30196451142d27d879a8f687f3cc';
// const authToken = '978f64b17f1149a06b5f1a84c6fe1bf4';
// const MessagingResponse = require('twilio').twiml.MessagingResponse;

app.use(methodOverride("_method"));

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
  })
);

app.get("/", function(req, res) {
  //grabs from DB
  // console.log('this is a GET request')
  let tasks;

  TaskDB.find({})
    .exec()
    .then(data => {
      tasks = data;
      // console.log("THIS IS TASKS********",tasks);
    })
    .then(() => {
      const css = new Set(); // CSS for all rendered React components
      const insertCss = (...styles) =>
        styles.forEach(style => css.add(style._getCss()));
      // Create a sheetsRegistry instance.
      const sheetsRegistry = new SheetsRegistry();

      // Create a sheetsManager instance.
      const sheetsManager = new Map();

      // Create a theme instance.
      const theme = createMuiTheme({
        palette: {
          primary: green,
          secondary: yellow,
          type: "light"
        }
      });

      // Create a new class name generator.
      const generateClassName = createGenerateClassName();
      const appString = renderToString(
        <JssProvider
          registry={sheetsRegistry}
          generateClassName={generateClassName}
        >
          <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
            <StyleContext.Provider value={{ insertCss }}>
              <App tasks={tasks} />
            </StyleContext.Provider>
          </MuiThemeProvider>
        </JssProvider>
      );
      const css1 = sheetsRegistry.toString();
      console.log("****css****\n", css, "\n");
      // console.log('****CSS1****\n', css1)
      const indexFile = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="theme-color" content="#000000">
        <style>${[...css].join("")}${css1}</style>
        <title>React App</title>
      </head>
      <body>
        <noscript>
          You need to enable JavaScript to run this app.
        </noscript>
        <div id="root">${appString}</div>

      </body>
    </html>
  `;
      res.status(200).send(indexFile);
    })
    .catch(err => {
      console.log(err, "THIS IS A GET PROMISE ERROR");
    });
});

app.post("/tasks", function(req, res) {
  //database endpoint; submits data from user input
  // let tasks;
  console.log(req.body, "*******");
  console.log(req.params, "*******");
  TaskDB.create(req.body, (err, result) => {
    if (err) {
      console.log("ERROR IN CREATE ", err);
    }
    console.log("CREATE SUCCESS ", result);
  });
  //   TaskDB.find({})
  //     .exec()
  //     .then(data => {
  //       // console.log('THIS IS DATA*******', data)
  //       tasks = data;
  //       console.log("THIS IS TASKS******", tasks);
  //     })
  //     .then(() => {
  //       const css = new Set(); // CSS for all rendered React components
  //       const insertCss = (...styles) =>
  //         styles.forEach(style => css.add(style._getCss()));
  //       // Create a sheetsRegistry instance.
  //       const sheetsRegistry = new SheetsRegistry();

  //       // Create a sheetsManager instance.
  //       const sheetsManager = new Map();

  //       // Create a theme instance.
  //       const theme = createMuiTheme({
  //         palette: {
  //           primary: green,
  //           accent: red,
  //           type: "light"
  //         }
  //       });

  //       // Create a new class name generator.
  //       const generateClassName = createGenerateClassName();
  //       const appString = renderToString(
  //         <JssProvider
  //           registry={sheetsRegistry}
  //           generateClassName={generateClassName}
  //         >
  //           <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
  //             <StyleContext.Provider value={{ insertCss }}>
  //               <App tasks={tasks} />
  //             </StyleContext.Provider>
  //           </MuiThemeProvider>
  //         </JssProvider>
  //       );
  //       const css1 = sheetsRegistry.toString();
  //       console.log("****css****\n", css, "\n");
  //       // console.log('****CSS1****\n', css1)
  //       const indexFile = `
  //   <!DOCTYPE html>
  //   <html lang="en">
  //     <head>
  //       <meta charset="utf-8">
  //       <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
  //       <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  //       <meta name="theme-color" content="#000000">
  //       <style>${[...css].join("")}${css1}</style>
  //       <title>React App</title>
  //     </head>
  //     <body>
  //       <noscript>
  //         You need to enable JavaScript to run this app.
  //       </noscript>
  //       <div id="root">${appString}</div>

  //     </body>
  //   </html>
  // `;

  res.status(200).redirect("/");
  // })
  // .catch(err => {
  //   console.log(err, "THIS IS A POST PROMISE ERROR");
  // });
  // });
});

app.delete("/tasks/:id", function(req, res) {
  console.log("DELETE REQUEST WORKING");
  console.log(req.params);
  // let tasks;
  TaskDB.findByIdAndRemove({ _id: req.params.id }, function(err, data) {
    if (err) {
      console.log("DELETE REQUEST ERROR");
    }
  });
  //   TaskDB.find({})
  //     .exec()
  //     .then(data => {
  //       console.log(data);
  //       tasks = data;
  //     })
  //     .then(() => {
  //       const css = new Set(); // CSS for all rendered React components
  //       const insertCss = (...styles) =>
  //         styles.forEach(style => css.add(style._getCss()));
  //       // Create a sheetsRegistry instance.
  //       const sheetsRegistry = new SheetsRegistry();

  //       // Create a sheetsManager instance.
  //       const sheetsManager = new Map();

  //       // Create a theme instance.
  //       const theme = createMuiTheme({
  //         palette: {
  //           primary: green,
  //           accent: red,
  //           type: "light"
  //         }
  //       });

  //       // Create a new class name generator.
  //       const generateClassName = createGenerateClassName();
  //       const appString = renderToString(
  //         <JssProvider
  //           registry={sheetsRegistry}
  //           generateClassName={generateClassName}
  //         >
  //           <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
  //             <StyleContext.Provider value={{ insertCss }}>
  //               <App tasks={tasks} />
  //             </StyleContext.Provider>
  //           </MuiThemeProvider>
  //         </JssProvider>
  //       );
  //       const css1 = sheetsRegistry.toString();
  //       console.log("****css****\n", css, "\n");
  //       // console.log('****CSS1****\n', css1)
  //       const indexFile = `
  //   <!DOCTYPE html>
  //   <html lang="en">
  //     <head>
  //       <meta charset="utf-8">
  //       <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
  //       <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  //       <meta name="theme-color" content="#000000">
  //       <style>${[...css].join("")}${css1}</style>
  //       <title>React App</title>
  //     </head>
  //     <body>
  //       <noscript>
  //         You need to enable JavaScript to run this app.
  //       </noscript>
  //       <div id="root">${appString}</div>

  //     </body>
  //   </html>
  // `;
  res.status(200).redirect("/");
  // })
  // .catch(err => {
  //   console.log(err, "THIS IS A DELETE PROMISE ERROR");
  // });
  // });
});

schedulerFactory.start();

app.listen(port);
console.log("Node server running on port ",port);

// module.exports = schedulerFactory();
