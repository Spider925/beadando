'use strict'

const Schema = use('Schema')

class VotesTableSchema extends Schema {

  up () {
    this.create('votes', (table) => {
      table.increments()
      table.boolean('rate_positive')
      table.boolean('rate_negative')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('picture_id').unsigned().references('id').inTable('pictures')
      table.timestamps()
    })
  }

  down () {
    this.drop('votes')
  }

}

module.exports = VotesTableSchema
