var express = require('express');
var router = express.Router();
var request = require('request');
var redis = require('redis');
var client = redis.createClient();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login',function(req,res){
   request.post('http://localhost:8080/authenticate', {
       form: {
           name:'usuario',
           password:'password'
       }
    }, function (error, response, body) {

      var data = JSON.parse(body);

      if(data.error) return res.send('ERROR' :  + error);

       client.set('1',data.token);

    });
});

router.post('/newProduct',function(req,res){

   //Obtener actual ID del usuario
   // var id =  Do Something...

   var token = client.get('1');

   request.get('http://localhost:8080/newProduct?token='+token, function (error, response, body) {
       var data = JSON.parse(body);

       if (data.error) {
           return res.send('ERROR: ' + data.error);
       }

       res.send('Se actualizo los productos correctamente');

    });
});

module.exports = router;
