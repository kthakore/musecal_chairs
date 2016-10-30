/*global require, module */
'use strict'
var Sequelize = require('sequelize');

var sequelize = new Sequelize('muse', 'postgres', 'GH4i9a91m', {
  dialect: 'postgres',
  host: 'localhost',
  port: 4337,
  logging: console.log,
  define: {
    timestamps: false // true by default
  }
});

// you can pass options, see bellow for details
var models = require('sequelize-auto-import')(sequelize, 'models');
module.exports = models;
