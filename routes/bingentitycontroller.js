'use strict';
let https = require ('https');
var request  = require('request');
var express = require('express');
var router = express.Router();
var jwt   = require('jsonwebtoken');
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });


//verify the token obatined from previous api
const check = function(req,res,next){
    console.log("inside function check: ",req.headers);
    var header = req.headers['authorization'];

    console.log("header: ",header);
    
    if(header === null || header === undefined){

        res.send("404");
    }
    else{
        console.log("inside else");
        
        jwt.verify(header,'myKey');
      
    }
    next();

} 

/**
* @swagger
* /api/v1/BingEntitySearch:
*   post:
*     description: this route will search for the content with the parameters given
*     parameters:
 *       - name: Authorization
 *         in: header
 *         type: string
 *         required: true
 *       - name: Region
 *         in: formData
 *         type: string
 *         required: true  
 *       - name: Word
 *         in: formData
 *         type: string
 *         required: true   
*     responses:
*       '200':
*         description: OK
*/

//Main route which is linked to entity search
router.post("/BingEntitySearch",urlencodedParser,check,function(req,res){

let host = 'api.cognitive.microsoft.com';
let path = '/bing/v7.0/entities';
let mkt = req.body.Region;
let q = req.body.Word;


let query = '?mkt=' + mkt + '&q=' + encodeURI(q) ; 
console.log(query);


let request_params = {
    method : 'GET',
    hostname : host,
    path : path + query,
    headers : {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key' : '2bf81b2765a848bca6eaa76e113d9fd5',
    }
};
    
//response handler 
let response_handler = function (response) {
    let body = '';

    response.on('data', function (d) {
        body += d;
    });
    response.on ('end', function () {
        let json = JSON.stringify(JSON.parse(body), null, '  ');
        //console.log (json);
        return res.send(json)
        });
};

    //request send to azure api
let requ = https.request (request_params, response_handler);
        requ.end ();

});



/**
* @swagger
* /api/v1/token:
*   post:
*     description: this will generate intial token
*     parameters:
 *       - name: name
 *         in: formData
 *         type: string
 *         required: true  
 *       - name: securecode
 *         in: formData
 *         type: string
 *         required: true   
*     responses:
*       '200':
*         description: OK
*/

//to generate the token which is valid for 6 minutes
router.post('/token',function(req,res){
    //console.log(req.body.name);
    
   var  name = req.body.name;
    var securecode =req.body.securecode;
    if(name === 'Anoop' && securecode ==='system'){
        var payload ={
            username : name,
        };
   //console.log("PAYLOAD",payload);
        var tokendetails = jwt.sign(payload,'myKey',{expiresIn: "0.1h"})
 // console.log('tokendetails',tokendetails);
        
        return res.json({Token :tokendetails});
    }
});




module.exports = router;
