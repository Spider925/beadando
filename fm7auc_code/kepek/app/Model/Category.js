'use strict'

const Lucid = use('Lucid')

class Category extends Lucid {
    pictures () {
        return this.hasMany('App/Model/Picture')
    }
}

module.exports = Category