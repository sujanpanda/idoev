const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('./models/user');
const City = require('./models/cities');
const Venue = require('./models/venues');
const Etype = require('./models/eventtype');
const Feedback = require('./models/feedback');
const Contact = require('./models/contact');
const Missing = require('./models/rpmisssing');
const Likevenue = require('./models/likevenue');
const Booking = require('./models/booking');
const Bookevnt = require('./models/bookevent');
const mongoose = require('mongoose');
// const db = "mongodb://sujanpandajackey:usersujan1@ds115035.mlab.com:15035/local_university";
// const db = "mongodb://localhost:27017/users_table";
const db = "mongodb://167.71.234.62:27017/users_table";
const expressValidator = require('express-validator');
const expressSession = require('express-session');
// image upload rquired
var filessystem = require('fs');
var Jimp = require('jimp');

// For admin
const Admin = require('./models/admin');

mongoose.connect(db, err => {
	if(err) {
		console.log('Error!' + err);
	} else {
		console.log('Connected to mongoDB');
	}
});

function verifyToken(req, res, next) {
	if(!req.headers.authorization) {
		return res.status(401).send('Unauthorized request')
	}
	let token = req.headers.authorization.split(' ')[1]
	if(token === 'null') {
		return res.status(401).send('Unauthorized request')
	}
	let payload = jwt.verify(token, 'secreteKey')
	if(!payload) {
		return res.status(401).send('Unauthorized request')
	}
	req.userId = payload.subject
	next()
}


var decodedToken='';
function verifyTk(req, res, next) {
	let token = req.query.token;
	jwt.verify(token, 'secreteKey', function(err, tokendata){
		if(err) {
			return res.status(400).send('Unauthorized request');
		}
		if(tokendata) {
			decodedToken = tokendata;
			next();
		}
	})
}

router.get('/tokengetting', verifyTk, function(req, res, next) {
	return res.status(200).json(decodedToken);
});

router.post('/register', (req, res) => {
	let userData = req.body;
	let user = new User(userData);
	var name = userData.name;
	var email = userData.email;
	var password = userData.password;

	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('name', 'Name Should be minimum three letters').isLength({min: 3});
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Use a valid Email Address').isEmail();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password', 'Password must have 6 charecters').isLength({min: 6});
	var errors = req.validationErrors();
	if (errors) {
		res.status(401).send(errors);
	} else {
		User.findOne({email:userData.email}, (error, user) => {
			if (user) {
				res.status(401).send([{msg:'Email you have entered is already exists'}]);
			} else {
				let newUser = new User(userData);
				newUser.save((error, registeredUser) => {
					if (error) {
						console.log(error)
					} else {
						let payload = {subject: registeredUser._id}
						let token = jwt.sign(payload, 'secreteKey')
						res.status(200).send({token})
					}
				});
			}
		});
	}
});

router.post('/login', (req, res) => {
	let userData = req.body;
	var email = userData.email;
	var password = userData.password;

	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Use a valid Email Address').isEmail();
	req.checkBody('password', 'Password is required').notEmpty();
	var errors = req.validationErrors();
	if (errors) {
		res.status(401).send(errors);
	} else {
		User.findOne({email:userData.email}, (error, user) => {
			if(error) {
				console.log(error);
			} else {
				if(!user) {
					res.status(401).send([{msg:'Wrong Credentials! Please check Email and Password you have entered'}]);
				} else if (user.password !== userData.password) {
					res.status(401).send([{msg:'Wrong Credentials! Please check Email and Password you have entered'}])
				} else {
					let payload = {subject: user._id};
					let token = jwt.sign(payload, 'secreteKey');
					res.status(200).send({token});
				}
			}
		});
	}
});

router.get('/userdetail', verifyToken, (req, res) => {
	User.findOne({_id:req.userId}, (error, user) => {
		if(error) {
			res.status(401);
		} else{
			res.json(user);
		}
	});
});

router.post('/updateuser', verifyToken, (req, res) => {
	let userData = req.body;
	var name = userData.name;
	var mobile = userData.mobile;
	var city = userData.city;
	var address = userData.address;

	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('name', 'Name Should be minimum three letters').isLength({min: 3});
	req.checkBody('mobile', 'Mobile Number is required').notEmpty();
	req.checkBody('mobile', 'Mobile Number not valid').isNumeric();
	req.checkBody('mobile', 'Type your 10 digit mobile number').isLength({min: 10, max:10});
	req.checkBody('city', 'City is required').notEmpty();
	req.checkBody('address', 'Address is required').notEmpty();
	var errors = req.validationErrors();
	if (errors) {
		res.status(401).send(errors);
	} else {
		User.findOne({_id: req.userId}, function(err, foundObj){
			if(err) {
				console.log(err);
			} else {
				if(!foundObj) {
					res.status(404).send({"msg":"No user found"});
				} else {
					if(req.body.name) {
						foundObj.name = req.body.name;
					}
					if(req.body.mobile) {
						foundObj.mobile = req.body.mobile;
					}
					if(req.body.city) {
						foundObj.city = req.body.city;
					}
					if(req.body.address) {
						foundObj.address = req.body.address;
					}
					foundObj.save(function(err, ubdatedObj){
						if(err) {
							console.log(err);
						} else {
							res.status(200).send({"msg":"Updated"});
						}
					});
				}
			}
		});
	}
});

router.post('/feedback', (req, res) => {
	let feedData = req.body;
	var name = feedData.name;
	var title = feedData.title;
	var message = feedData.message;

	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('name', 'Name Should be minimum three letters').isLength({min: 3});
	req.checkBody('title', 'Title is required').notEmpty();
	req.checkBody('message', 'Message is required').notEmpty();
	var errors = req.validationErrors();
	if (errors) {
		res.status(401).send(errors);
	} else {
		let newFeed = new Feedback(feedData);
		newFeed.save(function(err, feedBackDt){
			if(err) {
				console.log(err);
			} else {
				res.status(200).send({"msg":"Updated"});
			}
		});
	}

});

router.post('/contact', (req, res) => {
	let contData = req.body;
	var name = contData.name;
	var email = contData.email;
	var mobile = contData.mobile;
	var message = contData.message;

	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('name', 'Name Should be minimum three letters').isLength({min: 3});
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Use a valid Email Address').isEmail();
	req.checkBody('mobile', 'Mobile Number is required').notEmpty();
	req.checkBody('mobile', 'Mobile Number not valid').isNumeric();
	req.checkBody('mobile', 'Type your 10 digit mobile number').isLength({min: 10, max:10});
	req.checkBody('message', 'Message is required').notEmpty();
	var errors = req.validationErrors();
	if (errors) {
		res.status(401).send(errors);
	} else {
		let newCont = new Contact(contData);
		newCont.save(function(err, contDt){
			if(err) {
				console.log(err);
			} else {
				res.status(200).send({"msg":"Updated"});
			}
		});
	}

});

router.get('/cities', (req, res) => {
    City.find({}, function (err, allcity) {
    	var cityMap = {};
    	if(err){
    		console.log(err)
    	} else {
    		allcity.forEach(function(user) {
		      	cityMap[user.id] = user.name;
		    });
    		res.send(cityMap);
    	}
    });
});

router.get('/venues', (req, res) => {
    Venue.find({}, function (err, allvenue) {
    	var venueMap = {};
    	if(err){
    		console.log(err)
    	} else {
    		allvenue.forEach(function(user) {
		      	venueMap[user.id] = user.name;
		    });
    		res.send(venueMap);
    	}
    });
});

router.get('/venuedetail/:id', (req, res) => {
	if(isNaN(req.params.id)) {
		res.status(401).send([{msg:'Not Found'}]);
	} else {
		Venue.findOne({id: req.params.id}, function (err, allvenue) {
	    	if(err){
	    		console.log(err)
	    	} else {
	    		if(allvenue) {
	    			res.send(allvenue);
	    		} else {
	    			res.status(401).send([{msg:'Not Found'}]);
	    		}
	    	}
	    });
	}
});

router.get('/venuestrict/:id', verifyToken, (req, res) => {
	if(isNaN(req.params.id)) {
		res.status(401).send([{msg:'Not Found'}]);
	} else {
		Venue.findOne({id: req.params.id}, function (err, allvenue) {
	    	if(err){
	    		console.log(err)
	    	} else {
	    		if(allvenue) {
	    			res.send(allvenue);
	    		} else {
	    			res.status(401).send([{msg:'Not Found'}]);
	    		}
	    	}
	    });
	}
});

router.post('/cityvenues', (req, res) => {
	var ctNm = req.body.city;
	Venue.find({city: ctNm}, function (err, allvenue) {
		var venueMap = {};
    	if(err){
    		console.log(err)
    	} else {
    		allvenue.forEach(function(user) {
		      	venueMap[user.id] = user.name;
		    });
    		res.send(venueMap);
    	}
    });
});

router.post('/reportmissing', (req, res) => {
    let missData = req.body;
	var city = missData.city;
	var venue = missData.venue;
	var date = missData.date;
	var email = missData.email;
	var item = missData.item;
	var message = missData.message;

	req.checkBody('city', 'City is required').notEmpty();
	req.checkBody('venue', 'Venue is required').notEmpty();
	req.checkBody('date', 'Date is required').notEmpty();
	req.checkBody('date', 'Date format is not valid').isISO8601();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Use a valid Email Address').isEmail();
	req.checkBody('item', 'Item is required').notEmpty();
	req.checkBody('message', 'Message is required').notEmpty();
	var errors = req.validationErrors();
	if (errors) {
		res.status(401).send(errors);
	} else {
		let newMissRpt = new Missing(missData);
		newMissRpt.save(function(err, missDt){
			if(err) {
				console.log(err);
			} else {
				res.status(200).send({"msg":"We have reciept your request"});
			}
		});
	}
});

router.post('/likevenue', verifyToken, (req, res) => {
	let likeData = req.body;
	var venueid = likeData.venueid;
	var usersUniqId = likeData.usersUniqId;

	req.checkBody('usersUniqId', 'You are not Logged in').notEmpty();
	req.checkBody('venueid', 'Something Wrong').notEmpty();
	req.checkBody('venueid', 'Something Wrong').isNumeric();
	var errors = req.validationErrors();
	if(errors) {
		res.status(401).send(errors);
	} else {
		Likevenue.findOne({venueid: likeData.venueid, usersUniqId: likeData.usersUniqId}, function (err, allLikes) {
			if(err) {
				res.status(401).send(err);
			} else {
				if (allLikes) {
					Likevenue.deleteOne(allLikes, function(err, obj){
						if(err){
							res.status(401).send(err);
						} else {
							Likevenue.countDocuments({venueid: likeData.venueid}, function(error, numOfDocs) {
								res.send(numOfDocs+'');
							});
						}
					});
				} else {
					let newLike = new Likevenue(likeData);
					newLike.save((error, likePro) => {
						if (error) {
							res.status(401).send(error);
						} else {
							Likevenue.countDocuments({venueid: likeData.venueid}, function(error, numOfDocs) {
								res.send(numOfDocs+'');
							});
						}
					});
				}
			}
		})
	}
});

router.get('/getlikes/:id', (req, res) => {
	if(isNaN(req.params.id)) {
		res.status(401).send([{msg:'Not Found'}]);
	} else {
		Likevenue.countDocuments({venueid: req.params.id}, function (err, likelist) {
			if (err) {
				res.status(401).send([{msg:'Not Found'}]);
			} else {
				res.send(likelist+'');
			}
	    });
	}
});

router.get('/getallvenues/:id', (req, res) => {
	var getUrl = parseInt(req.params.id);
	if(isNaN(req.params.id)) {
		res.status(401).send([{msg:'Not Found'}]);
	} else {
		// increase th limit have to increase in venudetail.component
		Venue.find({},{},{skip: getUrl, limit: 4 }, function (err, allvenues) {
	    	res.send(allvenues);
	    });
	}
});

router.get('/venuelist', (req, res) => {
	Venue.countDocuments({}, function (err, venuelist) {
		if(err) {
			res.status(401).send([{msg:'Not Found'}]);
		} else {
			res.send(venuelist+'');
		}
    });
});

router.get('/bookingcalc/:id', (req, res) => {
	var bookUrl = parseInt(req.params.id);
	if(isNaN(req.params.id)) {
		res.status(401).send([{msg:'Not Found'}]);
	} else {
		Booking.find({venuid:bookUrl}, function (err, book) {
	    	res.send(book);
	    });
	}
});

/*==========================================\
|                                           |
|                 FOR PAYMENTS              |
|                                           |
\==========================================*/

const qs = require('querystring');
const https = require('https');
const checksum_lib = require('./payment/checksum');
const port = 3000;

var PaytmConfig = {
	mid: "tDhiEk36138657975029",
	key: "W@KWuSacNsGNwn6L",
	website: "WEBSTAGING"
}

router.get('/pay/:id', (req, res) => {
	Bookevnt.find({_id: req.params.id}, function (err, payMreq) {
		if(err) {
			console.log(err);
		} else {
			// res.send(payMreq);
			var params 					= {};
			params['MID'] 				= PaytmConfig.mid;
			params['WEBSITE']			= PaytmConfig.website;
			params['CHANNEL_ID']		= 'WEB';
			params['INDUSTRY_TYPE_ID']	= 'Retail';
			params['ORDER_ID']			= payMreq[0].ORDER_ID;
			params['CUST_ID'] 			= 'Customer001';
			params['TXN_AMOUNT']		= payMreq[0].TXN_AMOUNT+'.00';
			params['CALLBACK_URL']		= 'http://idoevent.xyz/api/callback';
			params['EMAIL']				= payMreq[0].EMAIL;
			params['MOBILE_NO']			= payMreq[0].MOBILE_NO+"";

			checksum_lib.genchecksum(params, PaytmConfig.key, function (err, checksum) {


				var txn_url = "https://securegw-stage.paytm.in/theia/processTransaction"; // for staging
				// var txn_url = "https://securegw.paytm.in/theia/processTransaction"; // for production
				var form_fields = "";
				for(var x in params){
					form_fields += "<input type='hidden' name='"+x+"' value='"+params[x]+"' >";
				}
				form_fields += "<input type='hidden' name='CHECKSUMHASH' value='"+checksum+"' >";

				res.writeHead(200, {'Content-Type': 'text/html'});
				res.write('<html><head><title>Merchant Checkout Page</title></head><body><center><h1>Please do not refresh this page...</h1></center><form method="post" action="'+txn_url+'" name="f1">'+form_fields+'</form><script type="text/javascript">document.f1.submit();</script></body></html>');
				res.end();
			});
		}
	});
});

router.post('/callback', (req, res) => {

	var body = '';
	        
    req.on('data', function (data) {
        body += data;
    });

    req.on('end', function () {
		// var html = "";
		var post_data = qs.parse(body);


		// received params in callback
		console.log('Callback Response: ', post_data, "\n");
    	// res.send(post_data.RESPCODE);
    	if(post_data.RESPCODE == '01') {
			Bookevnt.find({ORDER_ID: post_data.ORDERID}, function (err, paySuc) {
				if(err) {
					res.writeHead(200, {'Content-Type': 'text/html'});
					res.write('<script type="text/javascript">window.location.replace("http://idoevent.xyz/response/false");</script>');
					res.end();
				} else {
					if(!paySuc) {
						res.writeHead(200, {'Content-Type': 'text/html'});
						res.write('<script type="text/javascript">window.location.replace("http://idoevent.xyz/response/false");</script>');
						res.end();
					} else {
						paySuc[0].bookStatus = "paid";
						paySuc[0].save(function(err, updPayment){
							if(err){
								throw err;
							} else {
								res.writeHead(200, {'Content-Type': 'text/html'});
								res.write('<script type="text/javascript">window.location.replace("http://idoevent.xyz/response/'+paySuc[0]._id+'");</script>');
								res.end();
							}
						});
					}
				}
			});
		} else {
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write('<script type="text/javascript">window.location.replace("http://idoevent.xyz/response/false");</script>');
			res.end();
		}
		// html += "<b>Callback Response</b><br>";
		// for(var x in post_data){
		// 	html += x + " => " + post_data[x] + "<br/>";
		// }
		// html += "<br/><br/>";


		// verify the checksum
		var checksumhash = post_data.CHECKSUMHASH;
		// delete post_data.CHECKSUMHASH;
		var result = checksum_lib.verifychecksum(post_data, PaytmConfig.key, checksumhash);
		console.log("Checksum Result => ", result, "\n");
		// html += "<b>Checksum Result</b> => " + (result? "True" : "False");
		// html += "<br/><br/>";



		// Send Server-to-Server request to verify Order Status
		var params = {"MID": PaytmConfig.mid, "ORDERID": post_data.ORDERID};

		checksum_lib.genchecksum(params, PaytmConfig.key, function (err, checksum) {

			params.CHECKSUMHASH = checksum;
			post_data = 'JsonData='+JSON.stringify(params);

			var options = {
				hostname: 'securegw-stage.paytm.in', // for staging
				// hostname: 'securegw.paytm.in', // for production
				port: 443,
				path: '/merchant-status/getTxnStatus',
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Content-Length': post_data.length
				}
			};


			// Set up the request
			var response = "";
			var post_req = https.request(options, function(post_res) {
				post_res.on('data', function (chunk) {
					response += chunk;
				});

				post_res.on('end', function(){
					console.log('S2S Response: ', response, "\n");
				});
			});

			// post the data
			post_req.write(post_data);
			post_req.end();
		});
    });
});


router.post('/paypost', verifyToken, (req, res) => {
	let payMdata = req.body;
	var MOBILE_NO = payMdata.MOBILE_NO;
	var EMAIL = payMdata.EMAIL;
	var ORDER_ID = payMdata.ORDER_ID;
	var TXN_AMOUNT = payMdata.TXN_AMOUNT;
	var venuetype = payMdata.venuetype;
	var guest = payMdata.guest;
	var hours = payMdata.hours;
	var date = payMdata.date;
	var stime = payMdata.stime;
	var city = payMdata.city;
	var venue = payMdata.venue;
	var equip = payMdata.equip;
	var flowers = payMdata.flowers;
	var food = payMdata.food;
	var foodgan = payMdata.foodgan;
	var foodtype = payMdata.foodtype;
	var lighting = payMdata.lighting;
	var seating = payMdata.seating;
	var bookStatus = payMdata.bookStatus;

	req.checkBody('EMAIL', 'Email is required').notEmpty();
	req.checkBody('MOBILE_NO', 'Mobile Number is required').notEmpty();
	req.checkBody('ORDER_ID', 'Order id is required').notEmpty();
	req.checkBody('TXN_AMOUNT', 'Amount is required').notEmpty();
	req.checkBody('venuetype', 'Event type is required').notEmpty();
	req.checkBody('guest', 'Number guest is required').notEmpty();
	req.checkBody('hours', 'Hours to spend is required').notEmpty();
	req.checkBody('date', 'Date for booking is required').notEmpty();
	req.checkBody('stime', 'Time for booking is required').notEmpty();
	var errors = req.validationErrors();
	if (errors) {
		res.status(401).send(errors);
	} else {
		let payMprocess = new Bookevnt(payMdata);
		payMprocess.save(function(err, paympr){
			if(err) {
				console.log(err);
			} else {
				res.status(200).send(paympr._id);
			}
		});
	}
});

router.get('/payresponse/:id', (req, res) => {
	Bookevnt.find({_id: req.params.id}, function (err, payres) {
		if(err){
			console.log(err);
		} else {
			res.send(payres[0]);
		}
    });
});

router.get('/bookhistory/:id', (req, res) => {
	Bookevnt.find({EMAIL: req.params.id}).sort('-stime').exec(function (err, payhis) {
		if(err){
			console.log(err);
		} else {
			res.send(payhis);
		}
    });
});

router.post('/photoupload', function(req, res) {
	var cropDet = req.body;
	var xfirst = cropDet.xfirst;
	var yfirst = cropDet.yfirst;
	var pWdt = cropDet.pWdt;
	var pHgt = cropDet.pHgt;

	req.checkBody('xfirst', 'Crop again').notEmpty();
	req.checkBody('xfirst', 'Crop again').isNumeric();
	req.checkBody('yfirst', 'Crop again').notEmpty();
	req.checkBody('yfirst', 'Crop again').isNumeric();
	req.checkBody('pWdt', 'Crop again').notEmpty();
	req.checkBody('pWdt', 'Crop again').isNumeric();
	req.checkBody('pHgt', 'Crop again').notEmpty();
	req.checkBody('pHgt', 'Crop again').isNumeric();
	var errors = req.validationErrors();
	if (errors) {
		res.status(401).send([{msg:"Crop again"}]);
	} else {
		var x1 = parseInt(Math.round(cropDet.xfirst)),
			y1 = parseInt(Math.round(cropDet.yfirst)),
			pw = parseInt(Math.round(cropDet.pWdt)),
			ph = parseInt(Math.round(cropDet.pHgt))
		var file = req.files.filename;
		var orpath = 'upload/original/'+cropDet.fName+'/';
		var dir = './'+orpath;
		var dirCropPath = 'upload/cropped/'+cropDet.fName+'/';
		var dirCrop = './'+dirCropPath;
		var outPath = 'public/cropped/'+cropDet.fName+'/';
		console.log(cropDet);
		if(file.name.match(/.(jpg|jpeg|png)$/i) && file.mimetype.match(/(jpg|jpeg|png)$/i)) {
			var fileExt = file.name.split('.').pop();
			var fileDt = new Date().getTime();
			var extfilename = "user_"+fileDt+"_."+fileExt;
			var extfilename2 = "loader_"+fileDt+"_."+fileExt;
			var outPt = outPath+extfilename;
			var outPt2 = outPath+extfilename2;

			function doA() {
				return new Promise(function(resolve, reject) {
					if (!filessystem.existsSync(dir)){
				        filessystem.mkdirSync(dir);
				        filessystem.mkdirSync(dirCrop);
			        }
			        resolve();
				});
			}

			function doB() {
				return new Promise(function(resolve, reject) {
					if(req.files) {
						console.log(req.files.filename);
						file.mv(dir+extfilename, function(err) {
							if(err) {
								res.status(401).send([{msg:"Error occored"}]);
							} else {
								Jimp.read(dir+extfilename, (err, lenna) => {
								  	if (err){
								  		throw err;
								  	} else {
								  		lenna
								  		.crop(x1, y1, pw, ph)
									    .quality(80) // set JPEG quality
									    .resize(600, Jimp.AUTO)
									    .write(dirCrop+extfilename); // save
									    lenna
								  		.crop(x1, y1, pw, ph)
									    .quality(60) // set JPEG quality
									    .resize(10, Jimp.AUTO)
									    .write(dirCrop+extfilename2); // save
									    resolve();
								  	}
								});
							}
						});
					}
				});
			}
			
			function doC() {
				return new Promise(function(resolve, reject) {
					User.findOne({_id: cropDet.fName}, function(err, foundObj){
						if(err) {
							console.log(err);
						} else {
							if(!foundObj) {
								res.status(404).send({"msg":"No user found"});
							} else {
								if(outPt) {
									foundObj.imgpath = outPt;
								}
								if(outPt2) {
									foundObj.loadpath = outPt2;
								}
								foundObj.save(function(err, ubdatedObj){
									if(err) {
										console.log(err);
									} else {
										resolve();
				    					// res.status(200).send([{msg:outPt}]);
										// res.status(200).send({"msg":"Updated"});
										res.end();
									}
								});
							}
						}
					});
				});
			}

			async function main() {
				await doA()
				await doB()
				await doC()
				console.log("done");
			}

			main();
			
		} else {
			res.send([{msg:"Only jpg, jpeg and png are allowed"}]);
		}
	}
	
});

router.get('/eventtype', function(req, res) {
	Etype.find({}, function (err, evtype) {
		if(err){
			console.log(err);
		} else {
			res.send(evtype);
		}
    });
});

router.get('/citylisting', function(req, res) {
	City.find({}, function (err, ctlist) {
		if(err){
			console.log(err);
		} else {
			res.send(ctlist);
		}
    });
});

router.post('/venuefilter', (req, res) => {
    let filData = req.body;
	var strange = filData.strange,
		endrange = filData.endrange,
		ctname = filData.ctname,
		venutype = filData.venutype,
		venskip = filData.resnumb;

	req.checkBody('strange', 'Base price is required').notEmpty();
	req.checkBody('endrange', 'Base price is required').notEmpty();
	req.checkBody('ctname', 'Please choose your city').notEmpty();
	req.checkBody('venutype', 'Please choose venue type').notEmpty();
	var errors = req.validationErrors();
	if (errors) {
		res.status(401).send(errors);
	} else {
		var totalNumb;
		Venue.find({city:ctname}, function(err, ttNumb) {
			if(err) {
				console.log(err);
			} else {
				var ven = new Array();
				for(let i=0; i<ttNumb.length; i++) {
					var prices = ttNumb[i].baseprice,
						vntype = ttNumb[i].type,
						venSet = new Set(vntype);
					if(venSet.has("all") || venSet.has(venutype)) {
						if(prices >= strange && prices <= endrange) {
							ven.push(ttNumb[i]);
						}
					}
				}
				totalNumb = ttNumb.length;
			}
		});
		// limit can be increased
		Venue.find({city:ctname},{},{skip: venskip, limit: 2 }).sort('baseprice').exec(function(err, venfilter) {
			if(err) {
				console.log(err);
			} else {
				var ven = new Array();
				for(let i=0; i<venfilter.length; i++) {
					var prices = venfilter[i].baseprice,
						vntype = venfilter[i].type,
						venSet = new Set(vntype);
					if(venSet.has("all") || venSet.has(venutype)) {
						if(prices >= strange && prices <= endrange) {
							ven.push(venfilter[i]);
						}
					}
				}
				res.status(200).send({"result":ven, "totalRes":totalNumb});
			}
		});
	}
});



// for admin

function verifyAdmin(req, res, next) {
	if(!req.headers.authorization) {
		return res.status(401).send('Unauthorized request')
	}
	let admintk = req.headers.authorization.split(' ')[1]
	if(admintk === 'null') {
		return res.status(401).send('Unauthorized request')
	}
	let payload = jwt.verify(admintk, 'secreteKey')
	if(!payload) {
		return res.status(401).send('Unauthorized request')
	}
	req.userId = payload.subject
	next()
}

var decodAdminToken='';
function verifyAdminTk(req, res, next) {
	let admintk = req.query.admintk;
	jwt.verify(admintk, 'secreteKey', function(err, tokendata){
		if(err) {
			return res.status(400).send('Unauthorized request');
		}
		if(tokendata) {
			decodAdminToken = tokendata;
			next();
		}
	})
}

router.get('/admingetting', verifyAdminTk, function(req, res, next) {
	return res.status(200).json(decodAdminToken);
});

router.post('/adminlogin', (req, res) => {
	let userData = req.body;
	var userid = userData.userid;
	var password = userData.password;

	req.checkBody('userid', 'UserId is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	var errors = req.validationErrors();
	if (errors) {
		res.status(401).send(errors);
	} else {
		Admin.findOne({userid:userData.userid}, (error, admin) => {
			if(error) {
				console.log(error);
			} else {
				if(!admin) {
					res.status(401).send([{msg:'Wrong Credentials! Please check Userid and Password you have entered'}]);
				} else if (admin.password !== userData.password) {
					res.status(401).send([{msg:'Wrong Credentials! Please check Userid and Password you have entered'}])
				} else {
					let payload = {subject: admin._id};
					let admintk = jwt.sign(payload, 'secreteKey');
					res.status(200).send({admintk,usertype:'admin'});
				}
			}
		});
	}
});

router.get('/admincity', function(req, res) {
	City.find({}).sort({id: 'descending'}).exec(function (err, citylist) {
		if(err){
			console.log(err);
		} else {
			res.send(citylist);
		}
    });
});

router.post('/addcity', (req, res) => {
	let ctData = req.body;
	var name = ctData.name;
	var state = ctData.state;
	var id = ctData.id;

	req.checkBody('name', 'City is required').notEmpty();
	req.checkBody('state', 'State is required').notEmpty();
	req.checkBody('id', 'Id is required').notEmpty();
	var errors = req.validationErrors();
	if (errors) {
		res.status(401).send(errors);
	} else {
		City.countDocuments({}, function (err, ctlist) {
			if(err) {
				res.status(401).send([{msg:'Please Try Again'}]);
			} else {
				ctData.id = parseInt(ctlist)+1;
				let newCity = new City(ctData);
				newCity.save((error, registeredUser) => {
					if (error) {
						console.log(error)
					} else {
						res.status(200).send({"msg":"done"});
					}
				});
			}
	    });
	}
});

router.get('/getevtypes', function(req, res) {
	Etype.find({}).sort({_id: 'descending'}).exec(function (err, evlist) {
		if(err){
			console.log(err);
		} else {
			res.send(evlist);
		}
    });
});

router.post('/addeventtype', function(req, res) {
	let evtData = req.body;
	var type = evtData.type;

	req.checkBody('type', 'Event type is required').notEmpty();
	var errors = req.validationErrors();
	if (errors) {
		res.status(401).send(errors);
	} else {
		let newEvent = new Etype(evtData);
		newEvent.save((error, registerEvent) => {
			if (error) {
				console.log(error)
			} else {
				res.status(200).send({"msg":"done"});
			}
		});
	}
});

router.post('/addvenues', function(req, res) {
	let venueData = req.body;
	var id = venueData.id;
	var name = venueData.name;
	var city = venueData.city;
	var owner = venueData.owner;
	var detail = venueData.detail;
	var baseprice = venueData.baseprice;
	var type = venueData.type;

	req.checkBody('id', 'Id is required').notEmpty();
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('city', 'City is required').notEmpty();
	req.checkBody('owner', 'Owner is required').notEmpty();
	req.checkBody('detail', 'Detail is required').notEmpty();
	req.checkBody('baseprice', 'Baseprice is required').notEmpty();
	req.checkBody('type', 'Type is required').notEmpty();
	var errors = req.validationErrors();
	if (errors) {
		res.status(401).send(errors);
	} else {
		Venue.countDocuments({}, function (err, venlist) {
			if(err) {
				res.status(401).send([{msg:'Please Try Again'}]);
			} else {
				venueData.id = parseInt(venlist)+1;
				let newVenue = new Venue(venueData);
				newVenue.save((error, registerVenue) => {
					if (error) {
						console.log(error)
					} else {
						res.status(200).send(registerVenue._id);
						res.end();
					}
				});
			}
		});
	}
});

router.get('/checkvenue/:id', (req, res) => {
	Venue.find({_id: req.params.id}, function (err, evnt) {
		if(err){
			res.send({"msge":"not found"});
		} else {
			res.send({"msge":"found"});
		}
    });
});

router.post('/addvenueimg', (req, res) => {
	var cropDet = req.body;
	var id = cropDet.id;

	req.checkBody('id', 'Change your image').notEmpty();
	var errors = req.validationErrors();
	if (errors) {
		res.status(401).send([{msg:"Change your image"}]);
	} else {
		var file = req.files.filename;
		var orpath = 'upload/venues/'+cropDet.id+'/';
		var dir = './'+orpath;
	// 	var dirCropPath = 'upload/cropped/'+cropDet.fName+'/';
	// 	var dirCrop = './'+dirCropPath;
		var outPath = 'public/venues/'+cropDet.id+'/';
	// 	console.log(cropDet);
		if(file.name.match(/.(jpg|jpeg|png)$/i) && file.mimetype.match(/(jpg|jpeg|png)$/i)) {
			var fileExt = file.name.split('.').pop();
			var fileDt = new Date().getTime();
			var extfilename = "venue_"+fileDt+"_."+fileExt;
			var extfilename2 = "loader_"+fileDt+"_."+fileExt;
			var outPt = outPath+extfilename;
			var outPt2 = outPath+extfilename2;

			function doA() {
				return new Promise(function(resolve, reject) {
					if (!filessystem.existsSync(dir)){
				        filessystem.mkdirSync(dir);
			        }
			        resolve();
				});
			}

			function doB() {
				return new Promise(function(resolve, reject) {
					if(req.files) {
						file.mv(dir+extfilename, function(err) {
							if(err) {
								res.status(401).send([{msg:"Error occored"}]);
							} else {
								Jimp.read(dir+extfilename, (err, lenna) => {
								  	if (err){
								  		throw err;
								  	} else {
									    lenna
									    .quality(80) // set JPEG quality
									    .resize(600, Jimp.AUTO)
									    .write(dir+extfilename); // save
									    lenna
									    .quality(60) // set JPEG quality
									    .resize(10, Jimp.AUTO)
									    .write(dir+extfilename2); // save
									    resolve();
								  	}
								});
							}
						});
					}
				});
			}
			
			function doC() {
				return new Promise(function(resolve, reject) {
					Venue.findOne({_id: id}, function(err, foundObj){
						if(err) {
							console.log(err);
						} else {
							if(!foundObj) {
								res.status(404).send({"msg":"No venue found"});
							} else {
								if(outPt) {
									foundObj.venueimg = outPt;
								}
								if(outPt2) {
									foundObj.loadvenueimg = outPt2;
								}
								foundObj.save(function(err, ubdatedObj){
									if(err) {
										console.log(err);
									} else {
										resolve();
				    					// res.status(200).send([{msg:outPt}]);
										res.status(200).send({"msg":"updated"});
										res.end();
									}
								});
							}
						}
					});
				});
			}

			async function main() {
				await doA()
				await doB()
				await doC()
			}

			main();
			
		} else {
			res.send([{msg:"Only jpg, jpeg and png are allowed"}]);
		}
	}
});

router.post('/addownerimg', (req, res) => {
	var cropDet = req.body;
	var id = cropDet.id;

	req.checkBody('id', 'Change your image').notEmpty();
	var errors = req.validationErrors();
	if (errors) {
		res.status(401).send([{msg:"Change your image"}]);
	} else {
		var file = req.files.filename;
		var orpath = 'upload/venues/'+cropDet.id+'/';
		var dir = './'+orpath;
		var outPath = 'public/venues/'+cropDet.id+'/';
	// 	console.log(cropDet);
		if(file.name.match(/.(jpg|jpeg|png)$/i) && file.mimetype.match(/(jpg|jpeg|png)$/i)) {
			var fileExt = file.name.split('.').pop();
			var fileDt = new Date().getTime();
			var extfilename = "owner_"+fileDt+"_."+fileExt;
			var outPt = outPath+extfilename;

			function doA() {
				return new Promise(function(resolve, reject) {
					if (!filessystem.existsSync(dir)){
				        filessystem.mkdirSync(dir);
			        }
			        resolve();
				});
			}

			function doB() {
				return new Promise(function(resolve, reject) {
					if(req.files) {
						file.mv(dir+extfilename, function(err) {
							if(err) {
								res.status(401).send([{msg:"Error occored"}]);
							} else {
								Jimp.read(dir+extfilename, (err, lenna) => {
								  	if (err){
								  		throw err;
								  	} else {
									    lenna
									    .quality(80) // set JPEG quality
									    .resize(600, Jimp.AUTO)
									    .write(dir+extfilename); // save
									    resolve();
								  	}
								});
							}
						});
					}
				});
			}
			
			function doC() {
				return new Promise(function(resolve, reject) {
					Venue.findOne({_id: id}, function(err, foundObj){
						if(err) {
							console.log(err);
						} else {
							if(!foundObj) {
								res.status(404).send({"msg":"No venue found"});
							} else {
								if(outPt) {
									foundObj.ownerimg = outPt;
								}
								foundObj.save(function(err, ubdatedObj){
									if(err) {
										console.log(err);
									} else {
										resolve();
				    					// res.status(200).send([{msg:outPt}]);
										res.status(200).send({"msg":"updated"});
										res.end();
									}
								});
							}
						}
					});
				});
			}

			async function main() {
				await doA()
				await doB()
				await doC()
			}

			main();
			
		} else {
			res.send([{msg:"Only jpg, jpeg and png are allowed"}]);
		}
	}
});

router.get('/allvenuelist', (req, res) => {
	Venue.find().sort('-id').exec(function (err, allvenue) {
    	if(err){
    		console.log(err)
    	} else {
    		res.send(allvenue);
    	}
    });
});

router.get('/getvenuedetail/:id', (req, res) => {
	Venue.find({_id: req.params.id}, function (err, evnt) {
		if(err){
			res.send({"msge":"not found"});
		} else {
			res.send({"msge":"found", "data":evnt});
		}
    });
});

router.post('/editvenues', function(req, res) {
	let venueData = req.body;
	var id = venueData.id;
	var name = venueData.name;
	var city = venueData.city;
	var owner = venueData.owner;
	var detail = venueData.detail;
	var baseprice = venueData.baseprice;
	var type = venueData.type;

	req.checkBody('id', 'Id is required').notEmpty();
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('city', 'City is required').notEmpty();
	req.checkBody('owner', 'Owner is required').notEmpty();
	req.checkBody('detail', 'Detail is required').notEmpty();
	req.checkBody('baseprice', 'Baseprice is required').notEmpty();
	req.checkBody('type', 'Type is required').notEmpty();
	var errors = req.validationErrors();
	if (errors) {
		res.status(401).send(errors);
	} else {
		Venue.findOne({id: id}, function(err, foundObj){
			if(err) {
				console.log(err);
			} else {
				if(!foundObj) {
					res.status(404).send({"msg":"No venue found"});
				} else {
					if(req.body.id) {
						foundObj.id = req.body.id;
					}
					if(req.body.name) {
						foundObj.name = req.body.name;
					}
					if(req.body.city) {
						foundObj.city = req.body.city;
					}
					if(req.body.owner) {
						foundObj.owner = req.body.owner;
					}
					if(req.body.detail) {
						foundObj.detail = req.body.detail;
					}
					if(req.body.baseprice) {
						foundObj.baseprice = req.body.baseprice;
					}
					if(req.body.type) {
						foundObj.type = req.body.type;
					}
					foundObj.save(function(err, ubdatedObj){
						if(err) {
							console.log(err);
						} else {
							res.status(200).send({"msg":"Updated"});
						}
					});
				}
			}
		});
	}
});

router.get('/getcalculatebook/:id', (req, res) => {
	var bookUrl = parseInt(req.params.id);
	if(isNaN(req.params.id)) {
		res.status(401).send([{msg:'Not Found'}]);
	} else {
		Booking.find({venuid:bookUrl}, function (err, book) {
	    	res.send(book);
	    });
	}
});

router.post('/bookingcalculation', function(req, res) {
	let bookData = req.body;
	var venuid = bookData.venuid;
	var djprice = bookData.djprice;
	var mikeprice = bookData.mikeprice;
	var projectorprice = bookData.projectorprice;
	var breaknorm = bookData.breaknorm;
	var lunchnorm = bookData.lunchnorm;
	var dinnorm = bookData.dinnorm;
	var snacknorm = bookData.snacknorm;
	var tnbevrnorm = bookData.tnbevrnorm;
	var breaksemi = bookData.breaksemi;
	var lunchsemi = bookData.lunchsemi;
	var dinsemi = bookData.dinsemi;
	var snacksemi = bookData.snacksemi;
	var tnbevrsemi = bookData.tnbevrsemi;
	var breakdlx = bookData.breakdlx;
	var lunchdlx = bookData.lunchdlx;
	var dindlx = bookData.dindlx;
	var snackdlx = bookData.snackdlx;
	var tnbevrdlx = bookData.tnbevrdlx;
	var lightnorm = bookData.lightnorm;
	var lightsemi = bookData.lightsemi;
	var lightdlx = bookData.lightdlx;
	var flowernorm = bookData.flowernorm;
	var flowersemi = bookData.flowersemi;
	var flowerdlx = bookData.flowerdlx;
	var seatnorm = bookData.seatnorm;
	var seatsemi = bookData.seatsemi;
	var seatdlx = bookData.seatdlx;
	var addNonveg = bookData.addNonveg;

	req.checkBody('venuid', 'Venue ID is required').notEmpty();
	req.checkBody('djprice', 'DJ price is required').notEmpty();
	req.checkBody('djprice', 'DJ price should in number').isNumeric();
	req.checkBody('mikeprice', 'Mike price is required').notEmpty();
	req.checkBody('mikeprice', 'Mike price should in number').isNumeric();
	req.checkBody('projectorprice', 'Projector price is required').notEmpty();
	req.checkBody('projectorprice', 'Projector price should in number').isNumeric();
	req.checkBody('breaknorm', 'Normal Breakfast price is required').notEmpty();
	req.checkBody('breaknorm', 'Normal Breakfast price should in number').isNumeric();
	req.checkBody('lunchnorm', 'Normal Lunch price is required').notEmpty();
	req.checkBody('lunchnorm', 'Normal Lunch price should in number').isNumeric();
	req.checkBody('dinnorm', 'Normal Dinner price is required').notEmpty();
	req.checkBody('dinnorm', 'Normal Dinner price should in number').isNumeric();
	req.checkBody('snacknorm', 'Normal Snacks price is required').notEmpty();
	req.checkBody('snacknorm', 'Normal Snacks price should in number').isNumeric();
	req.checkBody('tnbevrnorm', 'Normal Tea And Beverage price is required').notEmpty();
	req.checkBody('tnbevrnorm', 'Normal Tea And Beverage price should in number').isNumeric();
	req.checkBody('breaksemi', 'Semi-delux Breakfast price is required').notEmpty();
	req.checkBody('breaksemi', 'Semi-delux Breakfast price should in number').isNumeric();
	req.checkBody('lunchsemi', 'Semi-delux Lunch price is required').notEmpty();
	req.checkBody('lunchsemi', 'Semi-delux Lunch price should in number').isNumeric();
	req.checkBody('dinsemi', 'Semi-delux Dinner price is required').notEmpty();
	req.checkBody('dinsemi', 'Semi-delux Dinner price should in number').isNumeric();
	req.checkBody('snacksemi', 'Semi-delux Snacks price is required').notEmpty();
	req.checkBody('snacksemi', 'Semi-delux Snacks price should in number').isNumeric();
	req.checkBody('tnbevrsemi', 'Semi-delux Tea And Beverage price is required').notEmpty();
	req.checkBody('tnbevrsemi', 'Semi-delux Tea And Beverage price should in number').isNumeric();
	req.checkBody('breakdlx', 'Delux Breakfast price is required').notEmpty();
	req.checkBody('breakdlx', 'Delux Breakfast price should in number').isNumeric();
	req.checkBody('lunchdlx', 'Delux Lunch price is required').notEmpty();
	req.checkBody('lunchdlx', 'Delux Lunch price should in number').isNumeric();
	req.checkBody('dindlx', 'Delux Dinner Price is required').notEmpty();
	req.checkBody('dindlx', 'Delux Dinner Price should in number').isNumeric();
	req.checkBody('snackdlx', 'Delux Snacks Price is required').notEmpty();
	req.checkBody('snackdlx', 'Delux Snacks Price should in number').isNumeric();
	req.checkBody('addNonveg', 'Nonveg Price is required').notEmpty();
	req.checkBody('addNonveg', 'Nonveg Price should in number').isNumeric();
	req.checkBody('tnbevrdlx', 'Tea And Beverage Price is required').notEmpty();
	req.checkBody('tnbevrdlx', 'Tea And Beverage Price should in number').isNumeric();
	req.checkBody('lightnorm', 'Normal Light Price is required').notEmpty();
	req.checkBody('lightnorm', 'Normal Light Price should in number').isNumeric();
	req.checkBody('lightsemi', 'Semi-delux Light Price is required').notEmpty();
	req.checkBody('lightsemi', 'Semi-delux Light Price should in number').isNumeric();
	req.checkBody('lightdlx', 'Delux Light Price is required').notEmpty();
	req.checkBody('lightdlx', 'Delux Light Price should in number').isNumeric();
	req.checkBody('flowernorm', 'Normal Flower Price is required').notEmpty();
	req.checkBody('flowernorm', 'Normal Flower Price should in number').isNumeric();
	req.checkBody('flowersemi', 'Semi-delux Flower Price is required').notEmpty();
	req.checkBody('flowersemi', 'Semi-delux Flower should in number').isNumeric();
	req.checkBody('flowerdlx', 'Delux Flower Price is required').notEmpty();
	req.checkBody('flowerdlx', 'Delux Flower Price should in number').isNumeric();
	req.checkBody('seatnorm', 'Normal Seating Price is required').notEmpty();
	req.checkBody('seatnorm', 'Normal Seating Price should in number').isNumeric();
	req.checkBody('seatsemi', 'Semi-delux Seating Price is required').notEmpty();
	req.checkBody('seatsemi', 'Semi-delux Seating Price should in number').isNumeric();
	req.checkBody('seatdlx', 'Delux Seating Price is required').notEmpty();
	req.checkBody('seatdlx', 'Delux Seating Price should in number').isNumeric();

	var errors = req.validationErrors();
	if (errors) {
		res.status(401).send(errors);
	} else {
		let newBkDetails = new Booking(bookData);
		newBkDetails.save((error, regBookCalc) => {
			if (error) {
				console.log(error)
			} else {
				res.status(200).send({"msg":"Updated"});
				res.end();
			}
		});
	}
});

router.post('/bookcalcupdate', function(req, res) {
	let bookData = req.body;
	var venuid = bookData.venuid;
	var djprice = bookData.djprice;
	var mikeprice = bookData.mikeprice;
	var projectorprice = bookData.projectorprice;
	var breaknorm = bookData.breaknorm;
	var lunchnorm = bookData.lunchnorm;
	var dinnorm = bookData.dinnorm;
	var snacknorm = bookData.snacknorm;
	var tnbevrnorm = bookData.tnbevrnorm;
	var breaksemi = bookData.breaksemi;
	var lunchsemi = bookData.lunchsemi;
	var dinsemi = bookData.dinsemi;
	var snacksemi = bookData.snacksemi;
	var tnbevrsemi = bookData.tnbevrsemi;
	var breakdlx = bookData.breakdlx;
	var lunchdlx = bookData.lunchdlx;
	var dindlx = bookData.dindlx;
	var snackdlx = bookData.snackdlx;
	var tnbevrdlx = bookData.tnbevrdlx;
	var lightnorm = bookData.lightnorm;
	var lightsemi = bookData.lightsemi;
	var lightdlx = bookData.lightdlx;
	var flowernorm = bookData.flowernorm;
	var flowersemi = bookData.flowersemi;
	var flowerdlx = bookData.flowerdlx;
	var seatnorm = bookData.seatnorm;
	var seatsemi = bookData.seatsemi;
	var seatdlx = bookData.seatdlx;
	var addNonveg = bookData.addNonveg;

	req.checkBody('venuid', 'Venue ID is required').notEmpty();
	req.checkBody('djprice', 'DJ price is required').notEmpty();
	req.checkBody('djprice', 'DJ price should in number').isNumeric();
	req.checkBody('mikeprice', 'Mike price is required').notEmpty();
	req.checkBody('mikeprice', 'Mike price should in number').isNumeric();
	req.checkBody('projectorprice', 'Projector price is required').notEmpty();
	req.checkBody('projectorprice', 'Projector price should in number').isNumeric();
	req.checkBody('breaknorm', 'Normal Breakfast price is required').notEmpty();
	req.checkBody('breaknorm', 'Normal Breakfast price should in number').isNumeric();
	req.checkBody('lunchnorm', 'Normal Lunch price is required').notEmpty();
	req.checkBody('lunchnorm', 'Normal Lunch price should in number').isNumeric();
	req.checkBody('dinnorm', 'Normal Dinner price is required').notEmpty();
	req.checkBody('dinnorm', 'Normal Dinner price should in number').isNumeric();
	req.checkBody('snacknorm', 'Normal Snacks price is required').notEmpty();
	req.checkBody('snacknorm', 'Normal Snacks price should in number').isNumeric();
	req.checkBody('tnbevrnorm', 'Normal Tea And Beverage price is required').notEmpty();
	req.checkBody('tnbevrnorm', 'Normal Tea And Beverage price should in number').isNumeric();
	req.checkBody('breaksemi', 'Semi-delux Breakfast price is required').notEmpty();
	req.checkBody('breaksemi', 'Semi-delux Breakfast price should in number').isNumeric();
	req.checkBody('lunchsemi', 'Semi-delux Lunch price is required').notEmpty();
	req.checkBody('lunchsemi', 'Semi-delux Lunch price should in number').isNumeric();
	req.checkBody('dinsemi', 'Semi-delux Dinner price is required').notEmpty();
	req.checkBody('dinsemi', 'Semi-delux Dinner price should in number').isNumeric();
	req.checkBody('snacksemi', 'Semi-delux Snacks price is required').notEmpty();
	req.checkBody('snacksemi', 'Semi-delux Snacks price should in number').isNumeric();
	req.checkBody('tnbevrsemi', 'Semi-delux Tea And Beverage price is required').notEmpty();
	req.checkBody('tnbevrsemi', 'Semi-delux Tea And Beverage price should in number').isNumeric();
	req.checkBody('breakdlx', 'Delux Breakfast price is required').notEmpty();
	req.checkBody('breakdlx', 'Delux Breakfast price should in number').isNumeric();
	req.checkBody('lunchdlx', 'Delux Lunch price is required').notEmpty();
	req.checkBody('lunchdlx', 'Delux Lunch price should in number').isNumeric();
	req.checkBody('dindlx', 'Delux Dinner Price is required').notEmpty();
	req.checkBody('dindlx', 'Delux Dinner Price should in number').isNumeric();
	req.checkBody('snackdlx', 'Delux Snacks Price is required').notEmpty();
	req.checkBody('snackdlx', 'Delux Snacks Price should in number').isNumeric();
	req.checkBody('addNonveg', 'Nonveg Price is required').notEmpty();
	req.checkBody('addNonveg', 'Nonveg Price should in number').isNumeric();
	req.checkBody('tnbevrdlx', 'Tea And Beverage Price is required').notEmpty();
	req.checkBody('tnbevrdlx', 'Tea And Beverage Price should in number').isNumeric();
	req.checkBody('lightnorm', 'Normal Light Price is required').notEmpty();
	req.checkBody('lightnorm', 'Normal Light Price should in number').isNumeric();
	req.checkBody('lightsemi', 'Semi-delux Light Price is required').notEmpty();
	req.checkBody('lightsemi', 'Semi-delux Light Price should in number').isNumeric();
	req.checkBody('lightdlx', 'Delux Light Price is required').notEmpty();
	req.checkBody('lightdlx', 'Delux Light Price should in number').isNumeric();
	req.checkBody('flowernorm', 'Normal Flower Price is required').notEmpty();
	req.checkBody('flowernorm', 'Normal Flower Price should in number').isNumeric();
	req.checkBody('flowersemi', 'Semi-delux Flower Price is required').notEmpty();
	req.checkBody('flowersemi', 'Semi-delux Flower should in number').isNumeric();
	req.checkBody('flowerdlx', 'Delux Flower Price is required').notEmpty();
	req.checkBody('flowerdlx', 'Delux Flower Price should in number').isNumeric();
	req.checkBody('seatnorm', 'Normal Seating Price is required').notEmpty();
	req.checkBody('seatnorm', 'Normal Seating Price should in number').isNumeric();
	req.checkBody('seatsemi', 'Semi-delux Seating Price is required').notEmpty();
	req.checkBody('seatsemi', 'Semi-delux Seating Price should in number').isNumeric();
	req.checkBody('seatdlx', 'Delux Seating Price is required').notEmpty();
	req.checkBody('seatdlx', 'Delux Seating Price should in number').isNumeric();

	var errors = req.validationErrors();
	if (errors) {
		res.status(401).send(errors);
	} else {
		Booking.findOne({venuid: req.body.venuid}, function(err, foundBookCalc){
			if(err) {
				console.log(err);
			} else {
				if(!foundBookCalc) {
					res.status(404).send({"msg":"No venue found"});
				} else {
					if(req.body.venuid) {
						foundBookCalc.venuid = req.body.venuid;
					}
					if(req.body.djprice) {
						foundBookCalc.djprice = req.body.djprice;
					}
					if(req.body.mikeprice) {
						foundBookCalc.mikeprice = req.body.mikeprice;
					}
					if(req.body.projectorprice) {
						foundBookCalc.projectorprice = req.body.projectorprice;
					}
					if(req.body.breaknorm) {
						foundBookCalc.breaknorm = req.body.breaknorm;
					}
					if(req.body.lunchnorm) {
						foundBookCalc.lunchnorm = req.body.lunchnorm;
					}
					if(req.body.dinnorm) {
						foundBookCalc.dinnorm = req.body.dinnorm;
					}
					if(req.body.snacknorm) {
						foundBookCalc.snacknorm = req.body.snacknorm;
					}
					if(req.body.tnbevrnorm) {
						foundBookCalc.tnbevrnorm = req.body.tnbevrnorm;
					}
					if(req.body.breaksemi) {
						foundBookCalc.breaksemi = req.body.breaksemi;
					}
					if(req.body.lunchsemi) {
						foundBookCalc.lunchsemi = req.body.lunchsemi;
					}
					if(req.body.dinsemi) {
						foundBookCalc.dinsemi = req.body.dinsemi;
					}
					if(req.body.snacksemi) {
						foundBookCalc.snacksemi = req.body.snacksemi;
					}
					if(req.body.tnbevrsemi) {
						foundBookCalc.tnbevrsemi = req.body.tnbevrsemi;
					}
					if(req.body.breakdlx) {
						foundBookCalc.breakdlx = req.body.breakdlx;
					}
					if(req.body.lunchdlx) {
						foundBookCalc.lunchdlx = req.body.lunchdlx;
					}
					if(req.body.dindlx) {
						foundBookCalc.dindlx = req.body.dindlx;
					}
					if(req.body.snackdlx) {
						foundBookCalc.snackdlx = req.body.snackdlx;
					}
					if(req.body.addNonveg) {
						foundBookCalc.addNonveg = req.body.addNonveg;
					}
					if(req.body.tnbevrdlx) {
						foundBookCalc.tnbevrdlx = req.body.tnbevrdlx;
					}
					if(req.body.lightnorm) {
						foundBookCalc.lightnorm = req.body.lightnorm;
					}
					if(req.body.lightsemi) {
						foundBookCalc.lightsemi = req.body.lightsemi;
					}
					if(req.body.lightdlx) {
						foundBookCalc.lightdlx = req.body.lightdlx;
					}
					if(req.body.flowernorm) {
						foundBookCalc.flowernorm = req.body.flowernorm;
					}
					if(req.body.flowersemi) {
						foundBookCalc.flowersemi = req.body.flowersemi;
					}
					if(req.body.flowerdlx) {
						foundBookCalc.flowerdlx = req.body.flowerdlx;
					}
					if(req.body.seatnorm) {
						foundBookCalc.seatnorm = req.body.seatnorm;
					}
					if(req.body.seatsemi) {
						foundBookCalc.seatsemi = req.body.seatsemi;
					}
					if(req.body.seatdlx) {
						foundBookCalc.seatdlx = req.body.seatdlx;
					}
					foundBookCalc.save(function(err, ubdateBook){
						if(err) {
							console.log(err);
						} else {
							res.status(200).send({"msg":"Updated"});
						}
					});
				}
			}
		});
	}
});

router.get('/getcontactform', (req, res) => {
	Contact.find({}).sort({_id: 'descending'}).exec(function (err, getcont) {
		if(err) {
			console.log(err);
		} else {
			res.send(getcont);
		}
    });
});

router.get('/getuserfeed', (req, res) => {
	Feedback.find({}).sort({_id: 'descending'}).exec(function (err, getfeed) {
		if(err) {
			console.log(err);
		} else {
			res.send(getfeed);
		}
    });
});

router.get('/getmisscollect', (req, res) => {
	Missing.find({}).sort({_id: 'descending'}).exec(function (err, getmisscol) {
		if(err) {
			console.log(err);
		} else {
			res.send(getmisscol);
		}
    });
});

router.get('/geteventbooking', (req, res) => {
	Bookevnt.find({}).sort({_id: 'descending'}).exec(function (err, geteventbook) {
		if(err) {
			console.log(err);
		} else {
			res.send(geteventbook);
		}
    });
});

router.post('/approvebooking', function(req, res) {
	let approveData = req.body;
	var ORDER_ID = approveData.ORDER_ID;

	req.checkBody('ORDER_ID', 'Id is required').notEmpty();
	var errors = req.validationErrors();
	if (errors) {
		res.status(401).send(errors);
	} else {
		Bookevnt.findOne({ORDER_ID: req.body.ORDER_ID}, function (err, apprBook) {
			if(err){
				res.send({"msg":"not found"});
			} else {
				if(!apprBook) {
					res.status(404).send({"msg":"Not found"});
				} else {
					if(req.body.ORDER_ID) {
						apprBook.bookStatus = "paided";
					}
					apprBook.save(function(err, ubdatedObj){
						if(err) {
							console.log(err);
						} else {
							res.status(200).send({"msg":"Updated"});
							res.end();
						}
					});
				}
			}
	    });
	}
});

router.get('/abcd', verifyAdmin, (req, res) => {
	res.send('working')
});
// router.get('/events', (req, res) => {
// 	let events = [
// 		{
// 			"_id": "1",
// 			"name": "Auto Expo",
// 			"description": "lorem ipsum",
// 			"date": "2012-04-23"
// 		},
// 		{
// 			"_id": "2",
// 			"name": "Auto Expo",
// 			"description": "lorem ipsum",
// 			"date": "2012-04-23"
// 		},
// 		{
// 			"_id": "3",
// 			"name": "Auto Expo",
// 			"description": "lorem ipsum",
// 			"date": "2012-04-23"
// 		},
// 		{
// 			"_id": "4",
// 			"name": "Auto Expo",
// 			"description": "lorem ipsum",
// 			"date": "2012-04-23"
// 		},
// 		{
// 			"_id": "5",
// 			"name": "Auto Expo",
// 			"description": "lorem ipsum",
// 			"date": "2012-04-23"
// 		},
// 		{
// 			"_id": "6",
// 			"name": "Auto Expo",
// 			"description": "lorem ipsum",
// 			"date": "2012-04-23"
// 		},
// 		{
// 			"_id": "7",
// 			"name": "Auto Expo",
// 			"description": "lorem ipsum",
// 			"date": "2012-04-23"
// 		},
// 		{
// 			"_id": "8",
// 			"name": "Auto Expo",
// 			"description": "lorem ipsum",
// 			"date": "2012-04-23"
// 		}
// 	]
// 	res.json(events);
// });
module.exports = router;