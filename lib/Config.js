/*global module, require*/
'use strict'
var co          = require('co'),
    fs          = require('fs'),
    debug       = require('debug')('CONFIG'),
    config_file = process.env.MUSE_CONFIG || '.config.json'

class Config {

  constructor () {

    this.data = {}
  }


  ApiKey() {
      return this.data.api_key
  }


  load () {

    try {
       this.data = JSON.parse(fs.readFileSync(config_file, {encoding: 'utf8'}))

       debug('Loaded config')

    } catch (e) {
       debug('Config file couldn\'t be loaded: ', e.message, e.stack)
    }

    return this

  }


}

let singleton = new Config()

module.exports =  singleton.load()
