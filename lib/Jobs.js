/* global require, modules */
'use strict'
var superagent = require('superagent'),
    Config     = require('./Config'),
    EventEmitter = require('events').EventEmitter

class Jobs extends EventEmitter {

  constructor(opts) {
      super()
  }

}

module.exports = Jobs
