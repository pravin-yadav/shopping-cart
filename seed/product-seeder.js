var Product  = require('../models/product.js');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopping');


var products  = [
		new Product({
			imagePath : 'https://static.giantbomb.com/uploads/original/12/128291/1837361-gothic__cdcovers_cc__front.jpg',
			title : 'Gothic Video Game',
			description : 'Awesome game!!!!!',
			price : 99
		}),
		new Product({
			imagePath : 'https://images10.newegg.com/ProductImage/2SN-0001-000D4-01.jpg',
			title : 'Apple Macbook Pro',
			description : 'Awesome Laptop !!!!!',
			price : 999
		}),
		new Product({
			imagePath : 'https://store.storeimages.cdn-apple.com/4974/as-images.apple.com/is/image/AppleInc/aos/published/images/H/KS/HKS22/HKS22_AV4?wid=1000&hei=1000&fmt=jpeg&qlt=95&op_sharpen=0&resMode=bicub&op_usm=0.5,0.5,0,0&iccEmbed=0&layer=comp&.v=1481591389910',
			title : 'Apple Iphone 7s plus',
			description : 'Awesome Mobile!!!!!',
			price : 600
		})
]

var done = 0;
for(i = 0 ; i < products.length ; i++ ){
	products[i].save(function(err , result){
		if(err){
			throw err;
		}done++;
		if(done === products.length){
			exit();
		}
	});
	
	}


function exit(){
	mongoose.disconnect();
}