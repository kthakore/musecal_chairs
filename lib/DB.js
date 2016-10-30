/*global require, module */
'use strict'
var Sequelize = require('sequelize'),
    Config    = require('./Config'),
    config = Config.Sequelize()

config.options.logging = require('debug')('SQL')

var sequelize = new Sequelize(config.database, config.username, config.password, config.options);

// you can pass options, see bellow for details
var models = require('sequelize-auto-import')(sequelize, 'models');
module.exports = models;
