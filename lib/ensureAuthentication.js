"use strict";
const jwt = require('jsonwebtoken');
const constants = require('../constants.js');

module.exports = function(req, res, next) {
	let token = req.headers.authorization;
	if (!token || token === '') {
		res.status(401);
		res.end();
		return;
	}

	token = token.replace('Bearer ', '');

	jwt.verify(token, constants.jwtSecret, (error, decoded) => {
		if (error){
			res.status(401);
			res.end();
		} else {
			next();
		}
	});
}
