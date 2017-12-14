var express = require('express');
var router = express.Router();
var Product = require('../models/product.js');
var passport = require('passport');
var csrf = require('csurf');

var csrfProtection = csrf();
router.use(csrfProtection);

/* GET home page. */
router.get('/', function(req, res, next) {
	Product.find(function(err, docs){
		var productChunks = [];
		var chunkSize = 3;
		for( var i = 0 ; i < docs.length ; i += chunkSize){
			productChunks.push(docs.slice(i , i + chunkSize));
		}
		res.render('index', { title : 'Shoppping Cart' , products : productChunks});
	});
	
});


//csrf routes signup page


router.get('/user/signup', csrfProtection, function (req, res) {
  // pass the csrfToken to the view
  res.render('user/signup', { csrfToken: req.csrfToken() })
})



//Login User using passport
router.post('/user/signup',
  passport.authenticate('local', { successRedirect: '/user/profile', failureRedirect: '/user/signup', failureFlash: true }),
  function(req, res) {
    res.redirect('user/profile');
  });


router.get('/user/profile', function(req,res,next){
	res.render('user/profile');
})

module.exports = router;
