'use strict'

const Lucid = use('Lucid')

class Vote extends Lucid {

  user () {
    return this.belongsTo('App/Model/User')
  }

}

module.exports = Vote