/*global require, should, describe */
'use strict'
var should = require('should'),
    Jobs   = require('../lib/Jobs')


describe('Jobs Class ', function () {

   it('Jobs can get', function (done) {
     var jobs = new Jobs()

     jobs.on('loaded', (msg) => {

        done()
      })
     jobs.GetData()

   })
})
