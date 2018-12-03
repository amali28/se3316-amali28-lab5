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

    //get function
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
        var isVerified = req.body.isVerified;
        
        // check if the email is valid
        
        if (email == ""){
            return res.json({message: 'Please enter a valid email'})
        }
        
        if (password == ""){
            return res.json({message: 'Please enter a valid password'})
        }
        
        User.find({'email': email}, function (err, acc){
            
            if (acc[0] == null){
                return res.json({message: 'Invalid email was entered.'});
            }
            
            var isValidPassword = bcrypt.compareSync(password, acc[0]['password']);
            
            if (!isValidPassword){
                return res.json({message: 'Invalid password was entered'});
            }      
            
            if ((acc[0]['isVerified'] == false)){
                acc[0]['isLoggedIn'] = true;
                res.send(acc[0]['isLoggedIn']);
            } else {
                res.send({message:'Success: ', email: acc.email});
            }
            
            if (err){
                return res.send("Error: " + err);
            }
        });
    });

router.route('/homepage')
    .get(function(req, res){
        res.send({message: 'Yo'});
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
           isVerified: false,
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
                    
                     var emailVerification;
        
                     host=req.get('host')
                     verificationLink = "https://"+req.get('host')+"/verify?id="+verificationCode;
        
                     emailVerification={
                       to : req.body.email,
                       subject : "PARKA EMAIL VERIFICATION",
                       html : "Use the following code to URL to verify your account: " + verificationLink, 
                     }
        
                    emailSender.sendMail(emailVerification, function(error, response){
                    if(error){
                        console.log(error);
                         res.end("Error.");
                    } else{
                         res.end("Email has successfully been sent.");
                    }
                 });
                    res.json({message: "Account has successfully been created"});
                });
            } else {
                res.json({message: "An account with this email has already been registered."});
                
            }
            if (err){
                res.send(err);
            }
        });
        
       
    })
    
    
app.get('/verify/?id=', function(req, res) {
    
    host = req.get('host');
    verificationCode = req.query.id;
    User.findOne({verificationCode: verificationCode}), function (err, returnedUser){
        if (err){
            console.log(err);
        } else {
            returnedUser.email;
            returnedUser.password;
            returnedUser.isVerified;
        }
    }
    //res.redirect('/verify?id=/' + verificationCode);
    
    
})


/*
router.put('/verify?id=',function(req,res){
 
    console.log("Domain is matched. Information is from authentic email");
    if(req.query.vcode ==verificationCode)
    {
        console.log("email is verified");
        res.end("Email has been Successfully verified");
        
        User.findOne({verificationCode: verificationCode}, function(err, foundObject){
            
            if (err){
                console.log(err);
                res.status(500).send();
            } else {
                
                if (!foundObject){
                    res.status(404).send();
                } else {
                    
                    foundObject.isVerified = true;
                    
                    foundObject.save(function(err, updatedObject){
                       if (err){
                           console.log(err);
                       } else {
                           foundObject.send(updatedObject);
                       }
                    });
                }
                
            }
            
        })
    
        
    }
    else
    {
        console.log("email is not verified");
        res.end("<h1>Bad Request</h1>");
    }
});


*/


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
router.route('/items/:item_id')

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
           item.tax = req.body.tax;
       

            // save the bear
            item.save(function(err) {
                if (err){
                    res.send(err);
                }
                res.json({ message: 'item updated!' });
            });

        });
    })
    // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
    .delete(function(req, res) {
        Item.remove({
            _id: req.params.item_id
        }, function(err, item) {
            if (err){
                res.send(err);
            }
            res.json({ message: 'Successfully deleted' });
        });
    });
    

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

