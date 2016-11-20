'use strict'

const Lucid = use('Lucid')

class User extends Lucid {

  apiTokens () {
    return this.hasMany('App/Model/Token')
  }

  votes () {
    return this.hasMany('App/Model/Vote')
  }

}

module.exports = User
