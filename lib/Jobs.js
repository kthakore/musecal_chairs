/* global require, modules */
'use strict'
var superagent   = require('superagent'),
    Config       = require('./Config'),
    EventEmitter = require('events').EventEmitter,
    request      = require('superagent')

class Jobs extends EventEmitter {

  constructor(opts) {
      super()
      this.opts = opts || {}
      this.endpoint = 'https://api-v2.themuse.com/jobs'
  }

  GetData() {
    var page = this.opts.page || 1

    return request
            .get(this.endpoint)
            .query({ page: page})
            .end((err, res) => {
                if (err) {
                  this.emit('error', new Error(err))
                }
            })

  }

}

module.exports = Jobs
