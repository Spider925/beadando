'use strict'

const Lucid = use('Lucid')

class Picture extends Lucid {
    category () {
        return this.belongsTo('App/Model/Category')
    }
}

module.exports = Picture