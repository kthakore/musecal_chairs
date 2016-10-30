'use strict'
var EventEmitter = require('events').EventEmitter,
  debug        = require('debug')('Runner'),
  Jobs         = require('../lib/Jobs')

class Runner extends EventEmitter {

  constructor(opts) {
    super(opts)
    this.current_page = opts.page || 0
    this.limit = undefined
  }

  run() {

    debug('Staring run')
    var jobs = new Jobs({page: this.current_page} ),
      self = this

    jobs.on('page_finished', (msg) => {
      debug('Page: ' + self.current_page + ' msg: ' + msg)

      if (self.current_page < jobs.page_count || (self.limit == undefined || self.current_page < self.limit_page)) {
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
