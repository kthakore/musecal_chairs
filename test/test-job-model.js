'use strict'
var should    = require('should'),
  models      = require('../lib/DB'),
  fs          = require('fs'),
  test_json   = JSON.parse(fs.readFileSync(__dirname + '/test_job.json')),
  config      = require('../lib/Config').Sequelize(),
  Sequelize   = require('sequelize'),
  sequelize   = new Sequelize(config.database, config.username, config.password, config.options)





describe('Job Model', function () {

  before(function (done)  {
    sequelize.query('DELETE FROM jobs')
    .then(() => {done()})
  })

  it('can be created', function (done) {
    models.jobs.create({
      publication_date: new Date()
    }).then(function (job) {
      should.exist(job.publication_date)
      done()
    })
  })
  it('can findOrCreate complete job test', function (done) {
    models.jobs.findOrCreate({where: {id: test_json.id}, defaults: test_json})
    .then(function (jobs) {
      var job = jobs[0]
      should.exist(job.name)
      should.exist(job.id)
      should.exist(job.short_name)
      should.exist(job.contents)
      should.exist(job.type)
      should.exist(job.model_type)
      should.exist(job.tags[0].short_name)
      should.exist(job.publication_date)
      should.exist(job.categories[0].name)
      done()
    })
  })

  it('can upsert complete job test', function (done) {
    test_json.created_at = new Date()
    test_json.updated_at = test_json.created_at
    models.jobs.upsert(test_json)
    .then(function () {
      done()
    })
  })


})


