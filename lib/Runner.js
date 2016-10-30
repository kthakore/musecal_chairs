'use strict'
var EventEmitter = require('events').EventEmitter,
  debug        = require('debug')('Runner'),
  Jobs         = require('../lib/Jobs')

class Runner extends EventEmitter {

  constructor(opts) {
    super(opts)
    this.current_page = opts.page || 0
    this.limit = opts.limit
  }

  run() {

    debug('Staring run')
    var jobs = new Jobs({page: this.current_page} ),
      self = this

    jobs.on('ratelimit_wait', (secs_to_wait) => {

      // Wait and then try again
      debug('Hit Rate Limit, waiting for:' + secs_to_wait)

      setTimeout(() => { self.run() }, secs_to_wait * 1000)
    })

    jobs.on('page_finished', (count) => {
      debug('Page: ' + self.current_page + ' out of  ' + jobs.page_count + ' loading ' + count + ' jobs')

      debug('Percentage done: ' + ((self.current_page / jobs.page_count) * 100) + '%')
      if (self.limit && self.current_page >= self.limit) {
        debug('Hit limit on runner')
        return
      }

      if (self.current_page < (jobs.page_count - 1)) {
        self.current_page++
        debug('Running next page: ', self.current_page)
        self.run()
      }


    })

    jobs.on('error', (err) => {
      debug(err)
      debug('Failing for current page:' + self.current_page)
    })
    jobs.GetData({page: this.current_page})


  }


}

module.exports = Runner
