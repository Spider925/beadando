'use strict'

const Database = use('Database')
const Category = use('App/Model/Category')
const Picture = use('App/Model/Picture')

class PictureController {

    * index (request, response) {
        const categories = yield Category.all()
        
        for (let category of categories) {
            const topPictures = yield category.pictures().limit(3).fetch()
            category.topPictures = topPictures.toJSON()

        }

        yield response.sendView('index', {
            categories: categories.toJSON()
        });
    }

    * show (request, response) {
        const name = request.param('name')
        const picture = yield Picture.findBy('name', name)
        if (!picture) {
            response.notFound('Ez a kép nincs az adatbázisban')
            return
        }
        yield response.sendView('showPicture', {
            picture: picture.toJSON()
        });
    }
}

module.exports = PictureController