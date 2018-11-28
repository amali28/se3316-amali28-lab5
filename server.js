// server.js

// BASE SETUP
// =============================================================================

// equivalent to imports
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var randomstring = require('randomstring');
var mongoose   = require('mongoose');
mongoose.connect('mongodb://amali28-se3316-amali28-lab5-6582532:27017/items', {useNewUrlParser: true}); // connect to our database

var Item    = require('./app/models/item');

const bcrypt = require('bcrypt');
const saltRounds = 10;

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

router.route('/createuser')
    .post(function(req,res){
        
        var email = req.body.email;
        
        // check if the email entered is a valid email
        if (email == "" || !validator.isEmail(email)){
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
        var verificationCode = randomstring.generate();
        
        var newUser = new User ({
           email: email,
           password: hash,
           verificationCode: verificationCode,
           isLoggedIn: false
        });
        
        User.find({'email':email}, function (err, acc){
            // if the response received demonstrates that the account has not been created, go forward with signing up the user
            if(acc[0] == null){
                newUser.save(function(err){
                    if (err){
                        res.send(err);
                    }
                    res.json({message: "Account has successfully been created"});
                });
            } else {
                res.json({message: "An account with this email already exists"});
            }
            if (err){
                res.send(err);
            }
        });
        
        var emailVerification;
        
        emailVerification={
            to : req.body.email,
            subject : "PARKA EMAIL VERIFICATION",
            html : "Use the following code to verify your account: " + newUser.verificationCode
        }

        
    })




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

