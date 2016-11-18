'use strict'

const Schema = use('Schema')

class PicturesTableSchema extends Schema {

  up () {
    this.create('pictures', (table) => {
      table.increments()
      table.string('name', 80).notNullable().unique()
      table.integer('rate', 50).notNullable()
      table.integer('width', 50).notNullable()
      table.integer('height', 50).notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('category_id').unsigned().references('id').inTable('categories')
      table.timestamps()
    })
  }

  down () {
    this.drop('pictures')
  }

}

module.exports = PicturesTableSchema
