'use strict'
var debug          =  require('debug')('JOBS'),
  Config           = require('./Config'),
  EventEmitter     = require('events').EventEmitter,
  request          = require('superagent'),
  _                = require('lodash'),
  models           = require('./DB')

class Jobs extends EventEmitter {

  constructor(opts) {
    super()
    this.opts = opts || {}
    this.endpoint = 'https://api-v2.themuse.com/jobs'
    this.results,
    this.completed = []

    this.on('inserted_job', () => {this.OnInsertedJob})
  }

  OnInsertedJob(id) {




  }

  SavePageJobs() {
      _.each(this.results, (job) => {
        debug('Working on job: ' + job.id)
        this.emit('inserting_job', job)

        models.jobs
          .findOrCreate({where: {id: job.id}, defaults: job})
          .then(function (jobs) {
            this.emit('inserted_job', jobs[0].id)
          })
          .catch((err) => {
            console.log(err)
          })
      })
  }


  GetData(o) {
    var opts = o || {},
      page = opts.page || 0

    debug('Creating JobsRequest with page: '+ page)
    var JobsRequest = request
    .get(this.endpoint)
    .query({page: page})


    if (Config.ApiKey()) {
      debug('Found api_key, adding to request')
      JobsRequest.query({ api_key : Config.ApiKey()})
    }


    return JobsRequest.end((err, res) => {
      if (err) {
        this.emit('error', new Error(err))
      }

      try {
        this.data = JSON.parse(res.text)

        this.page_count = this.data.page_count
        this.page = this.data.page
        this.results = this.data.results
        debug('Recieved results: ' + this.results.length)
        this.emit('loaded', this.results)
      } catch (e) {
        this.emit('error', e)
      }
      this.result = res
    })

  }

}

module.exports = Jobs
