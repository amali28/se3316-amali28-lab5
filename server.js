// server.js

// BASE SETUP
// =============================================================================

// equivalent to imports
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var randomstring = require('randomstring');
var mongoose   = require('mongoose');
var validator = require('validator');
var nev = require('email-verification')(mongoose);
mongoose.connect('mongodb://amali28-se3316-amali28-lab5-6582532:27017/items', {useNewUrlParser: true}); // connect to our database

var User    = require('./app/models/user');
var Item    = require('./app/models/item');
var Policy  = require('./app/models/policy');
var Claim   = require('./app/models/claim');

const bcrypt = require('bcrypt');
const saltRounds = 10;
const nodemailer = require('nodemailer');

var verificationLink, host, verificationCode;
var emailSender = nodemailer.createTransport({
    service: "Gmail",
     auth: {
        user: "bobfred1432@gmail.com",   
        pass: 'Apples1432'
    }
})

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var port = 8081;        // set our port

app.use('/', express.static('static'));

// ROUTES FOR OUR API
// =============================================================================

var router = express.Router();              // get an instance of the express Router
// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

//posting 

router.route('/users')

    .get(function(req, res) {
        User.find(function(err, items) {
            User.email = req.body.email;
            if (err){
                 res.send(err);
            }
            res.json(items);
        });

    });
    
router.route('/login')
    .post(function(req, res) {
        
        // request the email and the password from the front end 
        var email = req.body.email;
        var password = req.body.password;
        
        // check if the email is valid
        if (email === ""){
            res.send({message: 'Empty email has been entered'});
        }
        
        if (password === ""){
            res.send({message: "Empty password has been entered"});
        }
        
        User.findOne({email: email}, function(err, foundObject) {
            if (err){
                return res.send({message: "This account does not exist"});
            }
            if (foundObject === null){
                return res.send({message: "This account does not exist"});
            } 
            
            var isValidPassword = bcrypt.compareSync(password, foundObject.password);
            
            if (!isValidPassword){
               return res.send({message: "The entered password is incorrect"})
            } else {
                var isVerified = foundObject.isVerified;
                var isAdmin = foundObject.isAdmin;
                var isDisabled = foundObject.isDisabled;
            
                console.log(foundObject);
            
                if (isDisabled){
                    return res.send({message: "User disabled", id: foundObject._id});
                } else if (!isVerified){
                    return res.send({message: "Go verify!", id: foundObject._id})
                } else{
                    foundObject.isLoggedIn = true;
                    foundObject.save(function(err, updatedObject){
                       console.log(updatedObject);
                       if (err){
                           console.log(err);
                       } 
                       if (!updatedObject.isAdmin){
                         return  res.send({message: "Logged in!", id: foundObject._id});
                           
                       } else {
                         return  res.send({message: "Admin!", id: foundObject._id});
                       }
                    });
                    
                }
            }
            
        })
    });

router.route('/homepage')
    .get(function(req, res){
        res.send({message: 'Yo'});
    });
    
router.route('/admindash/:id')
    .post(function(req,res){
        User.findOne({verificationCode: req.body.verificationCode.id}, function (err, foundObject){
            if (err){
                res.send({message: err});
            } else {
                if (foundObject.isAdmin != true){
                    res.send("This man is not an admin");
                }
            }
        });
    });

router.route('/resend/:id')

    .post(function(req,res){
        console.log();
        User.findOne({verificationCode: req.body.verificationCode.id}, function (err, foundObject){
        
            if (err){
                res.send({message: err});
                console.log(err);
            } 

            if (foundObject){
                res.send({message: "Email resent"})
                sendEmailVerification(req.get('host'), foundObject.email);
            } else {
                res.send({message: "No user found"});
            }
    })
    });
    

router.route('/createuser')
    .post(function(req,res){
        
        var newEmail = req.body.email;
        var isVerified = req.body.isVerified;
        
        // check if the email entered is a valid email
        if (newEmail == "" || !validator.isEmail(newEmail)){
            // string response 
            return res.send({message: "Invalid email"});
        }
        
        var password = req.body.password;
        
        if (password == ""){
            return res.send({message: "Please enter a valid password"});
        }
        
        // encryption of the password using bcrypt
        var salt = bcrypt.genSaltSync(saltRounds);
        var hash = bcrypt.hashSync(password, salt);
        
        // generating a random verification code for the user
        verificationCode = randomstring.generate();

        var newUser = new User ({
           email: newEmail,
           password: hash,
           verificationCode: verificationCode,
           isLoggedIn: false,
           isDisabled: false,
           isVerified: false,
           isAdmin: false,
        });
        
        console.log(newEmail);
        console.log(password);
        
        User.find({'email':newEmail}, function (err, acc){
            // if the response received demonstrates that the account has not been created, go forward with signing up the user
            if(acc[0] == null){
                newUser.save(function(err){
                    if (err){
                        res.send(err);
                    }
                    
                   var didSendEmail = sendEmailVerification(req.get('host'), req.body.email);
                   
                   if (didSendEmail){
                       res.json({message: "Account has successfully been created", verificationCode: verificationCode});
                   } else {
                       res.json({message: "An account with this email has already been registered."});
                   }
                });
            } else {
                res.json({message: "An account with this email has already been registered."});
                
            }
            if (err){
                res.send(err);
            }
        });
        
       
    })
    

function sendEmailVerification(host, client){
          var emailVerification;
        
            verificationLink = "https://"+host+"/api/verify/"+verificationCode;
        
            console.log(verificationLink);
            
            emailVerification={
                       to : client,
                       subject : "PARKA EMAIL VERIFICATION",
                       html : "Use the following URL to verify your account: " + verificationLink, 
                     }
        
            emailSender.sendMail(emailVerification, function(error, response){
            if(error){
                 console.log(error);
                    return false;
                } 
        });
        return true;
}
    
router.get('/verify/:id',function(req,res){
    console.log("Stepped into verify");
    User.findOne({verificationCode: req.params.id}, function (err, foundObject){
        console.log(foundObject);
        if (foundObject != null){
             foundObject.isVerified = true;
                    foundObject.save(function(err, updatedObject){
                       console.log(updatedObject);
                       if (err){
                           console.log(err);
                       } 
                       if (updatedObject){
                           res.send({message: "VERIFIED"});
                       }
                    });
        } else {
            res.status(404).send();
             console.log("Email is not verified");
        res.end("<h1>Bad Request</h1>");
        }
    })
    });

router.route('/items')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        // create a new instance of the Bear model
        var item = new Item();
         item.name = req.body.name;  // update the bears info
         item.price = req.body.price;  
         item.quantity = req.body.quantity;
         item.tax = req.body.tax;
         item.id = req.body.id;
         item.descript = req.body.descript;
        // save the bear and check for errors
        item.save(function(err) {
            if (err){
               res.send(err);
            }
            res.json({ message: 'Item created!' });
        });
    })
    //get function
    .get(function(req, res) {
        Item.find(function(err, items) {
            Item.name = req.body.name;
            if (err){
                 res.send(err);
            }
            res.json(items);
        });

    });


    
router.route('/deleteusers/:id')
    .delete(function(req, res) {
		User.remove({
			_id: req.params.id
		}, function(err, bear) {
			if (err) {
				res.send(err);
			}
			res.json({ message: 'Successfully deleted user!' });
		});
	})
	.put (function(req, res){
	    User.findById(req.params.id, function(err, userFound) {
	        if (err){
	            res.send(err);
	        }
	       userFound.isAdmin = req.body.isAdmin;
	       userFound.isDisabled = req.body.isDisabled;
	       userFound.save(function(err){
	           if (err){
	               res.send(err)
	           } 
	           res.json({message: 'User updated!'});
	       })
	       
	    })
	})
	
router.route('/claims')
.get(function(req, res) {
        Claim.find(function(err, foundClaims) {
            if (err){
                res.send(err);
            }
            res.json(foundClaims);
        });
    })
    
.delete(function(req, res) {
		Claim.remove({
			_id: req.body.id
		}, function(err, bear) {
			if (err) {
				res.send(err);
			}
			res.json({ message: 'Successfully deleted claim' });
		});
	})

router.route('/policy')
.get(function(req, res) {
        Policy.find(function(err, foundPolicy) {
            if (err){
                res.send(err);
            }
            res.json(foundPolicy);
        });
    })
 .post(function(req, res){
     var claim = new Claim();
     claim.claimName = req.body.claimName;
     claim.claimDescription = req.body.claimDescription;
     
     claim.save(function (err){
         if (err){
             res.send(err);
         }
         res.json({message: 'Claim created!'})
     })
 })
 

router.route('/policy/:id')
	.put(function(req, res){
	
	    Policy.findById(req.params.id, function(err, foundPolicy){
	  
	        if (err){
	            res.send(err);
	        }
    
            foundPolicy.policy1 = req.body.policy1;
            foundPolicy.policy2 = req.body.policy2;
            foundPolicy.policy3 = req.body.policy3;
            
            foundPolicy.save(function(err) {
                if (err){
                    res.send(err);
                }
                res.json({ message: 'policy updated' });
            });
	    })
	})
	
 
  .post(function(req, res) {
        // create a new instance of the Bear model
        var policy = new Policy();
        
         policy.policy1 = req.body.policy1;  // update the bears info
         policy.policy2 = req.body.policy2; 
         policy.policy3 = req.body.policy3; 
        
        policy.save(function(err) {
            if (err){
               res.send(err);
            }
            res.json({ message: 'Policy created!' });
        });
    })
    
  .delete(function(req, res) {
		Policy.remove({
			_id: req.body.id
		}, function(err, bear) {
			if (err) {
				res.send(err);
			}
			res.json({ message: 'Successfully deleted policy' });
		});
	})
    

router.route('/modify/:id')
    .delete(function(req, res) {
		Item.remove({
			_id: req.params.id
		}, function(err, bear) {
			if (err) {
				res.send(err);
			}
			res.json({ message: 'Successfully deleted item!' });
		});
	})
	.put(function(req, res){
	
	    Item.findById(req.params.id, function(err, item){
	       
	       console.log(req.body);
	        if (err){
	            res.send(err);
	        }
	        item.name = req.body.name;
	        item.price = req.body.price;
	        item.descript = req.body.descript;
	        item.quantity = req.body.quantity;
	        
	         // save the bear
            item.save(function(err) {
                if (err){
                    res.send(err);
                }
                res.json({ message: 'item updated!' });
            });
	    })
	})
	

router.route('/items')
    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        Item.findById(req.params.item_id, function(err, item) {
            if (err){
                res.send(err);
            }
            res.json(item);
        });
    })
    // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
    .put(function(req, res) {

        // use our bear model to find the bear we want
        Item.findById(req.params.item_id, function(err, item) {

            if (err){
                 res.send(err);
            }
           item.name = req.body.name;  // update the bears info
           item.price = req.body.price;  
           item.quantity = req.body.quantity;
           item.descript = req.body.descript;
       

            // save the bear
            item.save(function(err) {
                if (err){
                    res.send(err);
                }
                res.json({ message: 'item updated!'});
            });

        });
    })

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

