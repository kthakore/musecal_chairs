'use strict'
var debug          =  require('debug')('JOBS'),
  Config           = require('./Config'),
  EventEmitter     = require('events').EventEmitter,
  request          = require('superagent'),
  _                = require('lodash'),
  models           = require('./DB'),
  Promise          = require('bluebird')

class Jobs extends EventEmitter {

  constructor(opts) {
    super()
    this.opts = opts || {}
    this.endpoint = 'https://api-v2.themuse.com/jobs'
    this.results,
    this.completed = {}

    this.on('inserted_job', (id) => {this.OnInsertedJob(id)})
  }

  OnInsertedJob(id) {

    //Find out if all the results are done
    this.completed[id] = true

    debug(this.results.length, _.keys(this.completed).length)
    if (this.results.length == _.keys(this.completed).length) {
      this.emit('page_finished',  this.results.length)
      debug('COMPLETED')
    }
  }

  SaveJob(job) {
    var self = this,
      promises = []


    job.company.created_at = job.company.updated_at = job.company.created_at = job.created_at = job.updated_at = new Date()

    promises.push(models.companies.upsert(job.company))
    promises.push(models.jobs.upsert(job))

    Promise.all(promises).then(function() {

      models.jobs_x_company.upsert({job_id: job.id, company_id: job.company.id})
      .then(() => {
        self.emit('inserted_job', job.id)
      })
      .catch((err) => {
        self.emit('error', err)
      })

    }).catch((err) => {
      self.emit('error', err)
    })
  }

  SavePageJobs() {
    var self = this
    _.each(this.results, (job) => { self.SaveJob(job) })
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
        if (res.status == 403) {
          // Hit rate limit: Wait for some seconds
          var secs_to_wait = res.header['X-RateLimit-Reset']
          this.emit('ratelimit_wait', secs_to_wait)
        } else {
          this.emit('error', new Error(err))
        }
      }

      try {
        this.data = JSON.parse(res.text)

        this.page_count = this.data.page_count
        this.page = this.data.page
        this.results = this.data.results
        debug('Recieved results: ' + this.results.length)
        this.emit('loaded', this.results)
        this.SavePageJobs()
      } catch (e) {
        this.emit('error', e)
      }
      this.result = res
    })

  }

}

module.exports = Jobs
