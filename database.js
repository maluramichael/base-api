"use strict";
let sequelize = require('sequelize');

module.exports = new sequelize('api', 'root', 'root', {
	host: 'localhost',
	dialect: 'sqlite',
	storage: './data.sqlite'
});
