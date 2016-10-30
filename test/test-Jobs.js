'use strict'
var should = require('should'),
  Jobs   = require('../lib/Jobs'),
  debug   = require('debug')('mocha')


describe('Jobs Class ', function () {

  it('Jobs can get', function (done) {
    var jobs = new Jobs()

    jobs.on('loaded', (msg) => {
      debug(msg)
      should.exist(msg)
      done()
    })
    jobs.GetData()

  })
})
