'use strict'
var EventEmitter = require('events').EventEmitter,
  debug        = require('debug')('Runner'),
  Jobs         = require('../lib/Jobs')

class Runner extends EventEmitter {

  constructor(opts) {
    super(opts)
    this.current_page = opts.page || 0
  }

  run() {

    var jobs = new Jobs({page: this.current_page} )

    jobs.on('page_finished', (msg) => {
      debug('Page: ' + this.current_page + ' msg: ' + msg)

      if (this.current_page < jobs.page_count) {
        this.current_page++
        debug('Running next page: ', this.current_page)
        this.run()
      }


    })

    jobs.on('error', () => {
      debug('Failing for current page:' + this.current_page)
    })
    jobs.GetData()


  }


}

module.exports = Runner
