var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const path =require('path');
const bing = require("./routes/bingentitycontroller");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require ('swagger-ui-express');

//Implementing swagger 
const swaggerOptions ={
  swaggerDefinition: {
    info: {
      title: 'Bing entity Search api',
      description: 'implementation of swagger for Bing entity Search api',
      contact: {
        name:' Anoop Narne'
      },
      basePath:"/api/v1",
      servers:["http://64.225.28.35:3000"]
    }
  },
  apis: ['./routes/bingentitycontroller.js']
  }
  
  const swaggerDocs= swaggerJsDoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  app.use('/api/v1', express.static(path.join(__dirname, 'routes')));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
	  //Allowing only post for this project
    res.header("Access-Control-Allow-Methods", "POST");
    return res.status(200).json({});
  }
  next();
});

//middleware to routes
app.use('/api/v1',bing);

app.use((req, res, next) => {
  const error = new Error("not allowed");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(500);
  res.json({
  Error : error.message
   
  });
});

app.listen(3000);
