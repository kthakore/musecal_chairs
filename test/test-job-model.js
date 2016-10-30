'use strict'
var should = require('should'),
  models = require('../lib/DB')


describe('Job Model', function () {

  it('can be created', function (done) {
    var date = new Date(),
      created = models.jobs.create({
        publication_date: date
      }).then(function () {
        should.exist(created.publication_date)
        done()
      })


  })

})


