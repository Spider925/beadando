'use strict'

const Database = use('Database')
const Category = use('App/Model/Category')
const Picture = use('App/Model/Picture')
const Validator = use('Validator')
const Helpers = use('Helpers')

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

    * upload (request, response) {
        const categories = yield Category.all();
        yield response.sendView('upload', {
            categories : categories.toJSON()
        });
    }

    * doUpload (request, response) {
        const pictureData = request.except('_csrf', 'filename');
        const rules = {
            name: 'required',
            category_id: 'required',
        }
        const validation = yield Validator.validateAll(pictureData, rules);
        if (validation.fails()) {
            yield request
                    .withAll()
                    .andWith({ errors: validation.messages() })
                    .flash()
            response.redirect('back')
            return
        }
        // ez volt az a pont ahol megőrültem...
        //console.log(pictureData)
        var id = yield Database.from('pictures').pluck('id')
        //console.log(id)
        var seged = 0
        for (var i =0; i<id.length; i++) {
            if (seged < id[i]) {
                seged = id[i]
            }
        }
        seged = seged + 1
        pictureData.name = pictureData.name + "_" + seged
        
        pictureData.rate_positive = 0
        pictureData.rate_negative = 0
        pictureData.user_id = 1

        //console.log(pictureData)
        //yield Picture.create(pictureData)
        // és akkor jött ez -.-'
        const pictureFile = request.file('filename', {
            maxSize: '4mb',
            allowedExtensions: ['png']
        })
        const fileName = pictureData.name + ".png"
        //console.log(fileName)
        yield pictureFile.move(Helpers.storagePath('images'), fileName)
        if (!pictureFile.moved()) {
            response.badRequest(pictureFile.errors())
            return
        }
        respone.ok("Sikeres feltöltés")

    }


}

module.exports = PictureController