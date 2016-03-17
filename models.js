"use strict";
const sequelize = require('sequelize');
const database = require('./database.js');

var User = database.define('user', {
	username: {
		allowNull: false,
		type: sequelize.STRING,
		validate: {
			notEmpty: true
		}
	},
	password: {
		allowNull: false,
		type: sequelize.STRING,
		validate: {
			notEmpty: true
		}
	}
});

var Event = database.define('event', {
	name: {
		allowNull: false,
		type: sequelize.STRING,
		validate: {
			notEmpty: true
		}
	}
});

module.exports = {
	User,
	Event
}
