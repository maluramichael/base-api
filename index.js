"use strict";
// ####################################################################################################################
// # Packages
// #####################################################################################################################
const express = require('express'),
	bodyParser = require('body-parser'),
	sequelize = require('sequelize'),
	jwt = require('jsonwebtoken'),
	bcrypt = require('bcrypt-nodejs'),
	_ = require('lodash'),
	async = require('async');

// #####################################################################################################################
// # Instances
// #####################################################################################################################
let app = express(),
	database = require('./database.js'),
	scaffoldRouter = require('./lib/scaffoldRouter.js');

// #####################################################################################################################
// # Constants
// #####################################################################################################################
const jwtSecret = 'THIS_IS_SPARTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

// #####################################################################################################################
// # Models
// #####################################################################################################################
let models = require('./models.js');

// #####################################################################################################################
// # Database
// #####################################################################################################################
database.sync({force: true});

app.use((req, res, next)=>{
	req.models = models;
	next();
});

// #####################################################################################################################
// # Routes
// #####################################################################################################################
let indexRouter = express.Router();
let authenticationRouter = express.Router();
let usersRouter = scaffoldRouter(models.User);

indexRouter.get('/', (req, res)=>{
	res.json({});
});

// register
authenticationRouter.post('/', (req, res)=>{
	bcrypt.hash(req.body.password, null, null, (error, hash) => {
		req.models.User.create({username: req.body.username, password: hash})
			.then(()=>{
				var token = jwt.sign({username: req.body.username}, jwtSecret);
				res.json({token});
			});
	})
});

// login
authenticationRouter.post('/token', (req, res)=>{
	console.log(req.body);
	req.models.User.findOne({where: {username: req.body.username}})
		.then((user)=>{
			if (user) {
				bcrypt.compare(req.body.password, user.password, (error, correct) => {
					if (correct){
						var token = jwt.sign({username: user.username}, jwtSecret);
						res.json({token});
					} else {
						res.status(401);
						res.end();
					}
				});
			} else {
				res.status(401);
				res.end();
			}
		});
});

// #####################################################################################################################
// # Middleware
// #####################################################################################################################
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/authentication', authenticationRouter);

// #####################################################################################################################
// # Start server
// #####################################################################################################################
app.listen(30005, ()=>{
	console.log('listening on 30005');
});
