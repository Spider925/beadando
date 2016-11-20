'use strict'

const Database = use('Database')
const Category = use('App/Model/Category')
const Picture = use('App/Model/Picture')
const Validator = use('Validator')
const Helpers = use('Helpers')
const User = use('App/Model/User')
const Vote = use('App/Model/Vote')


class PictureController {

    * index (request, response) {
        const categories = yield Category.all()
        
        for (let category of categories) {
            const topPictures = yield category.pictures().limit(9).fetch()
            category.topPictures = topPictures.toJSON()

        }
        yield response.sendView('index', {
            categories: categories.toJSON()
        });
    }

    * show (request, response) {
        const name = request.param('name')
        const picture = yield Picture.findBy('name', name)
        const categories = yield Category.all()
        const currentuser = request.currentUser.id
        const voted = yield Vote.findBy('user_id', currentuser)

        if (!picture) {
            response.notFound('Ez a kép nincs az adatbázisban')
            return
        }

        yield response.sendView('showPicture', {
            picture: picture.toJSON(),
            categories: categories.toJSON(),
            voted
        });
    }

    * categoryShow (request, response) {
        const id = request.param('id')
        const pictures = yield Picture.query().where('category_id', id);
        const category = yield Category.query().where('id', id)
        const categories = yield Category.all()
        //console.log(category)
        yield response.sendView('showCategory', {
            pictures,
            category,
            categories: categories.toJSON()
        });
    }

    * userpicturesShow (request, response) {
        const id = request.currentUser.id
        const pictures = yield Picture.query().where('user_id', id)
        const categories = yield Category.all()
        //console.log(category)
        yield response.sendView('showUploads', {
            pictures,
            categories: categories.toJSON()
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
        pictureData.user_id = request.currentUser.id

        //console.log(pictureData)
        yield Picture.create(pictureData)
        // és akkor jött ez -.-'
        const pictureFile = request.file('filename', {
            maxSize: '4mb',
            allowedExtensions: ['png']
        })
        const fileName = pictureData.name + ".png"
        //console.log(fileName)
        yield pictureFile.move(Helpers.publicPath('images'), fileName)
        if (!pictureFile.moved()) {
            response.badRequest(pictureFile.errors())
            return
        }
        response.redirect('/')

    }

    * delete (request, response) {
        const name = request.param('name')
        const picture = yield Picture.findBy('name', name)
        if (!picture) {
            response.notFound('Ez a kép nincs az adatbázisban')
            return
        }
        var fs = require('fs');
        var filePath = Helpers.publicPath('images/'+name+'.png'); 
        //console.log(filePath)
        fs.unlinkSync(filePath);
        yield picture.delete()

        response.redirect('/')
    }

    * upvote (request, response) {
        const name = request.param('name')
        var pictureID = yield Database.from('pictures').where('name', name).pluck('id')
        // ellenőrizzük,hogy szavazott-e már a felhasználó
        // bár a gomb inaktív a kép alatt, de védjük magunkat a kicsi k***i hackerektől :)
       if (yield Vote.findBy('picture_id', pictureID[0])) {
            // ha igen, nézzük meg,hogy mire
            const voted = yield Database.from('pictures').where('name', name).pluck('rate_positive')
            // ha a pozitív szavazatot adott korábban is akkor ne csináljunk semmit
            if(voted[0]) {
                response.redirect('back')
                return
            }
            // ha negatív volt eddig, akkor változtassuk meg a táblában a szavazatot
            yield Database.from('votes').where('picture_id', pictureID[0]).update('rate_positive', true)
            yield Database.from('votes').where('picture_id', pictureID[0]).update('rate_negative', false)
            // csökkentsük a negatív szavazatokat eggyel
            var picture = yield Database.from('pictures').where('name', name).pluck('rate_negative')
            var num = picture[0] - 1
            yield Database.from('pictures').where('name', name).update('rate_negative', num)
            // növeljük a pozitív szavazatot eggyel
            var picture = yield Database.from('pictures').where('name', name).pluck('rate_positive')
            var num = picture[0] + 1
            yield Database.from('pictures').where('name', name).update('rate_positive', num)

            response.redirect('back')
            return            
        }
        // ha még nem szavazott a képre a felhasználó akkor növeljük a pozitív szavazatot
        var picture = yield Database.from('pictures').where('name', name).pluck('rate_positive')
        var num = picture[0] + 1
        yield Database.from('pictures').where('name', name).update('rate_positive', num)
        // valamint adjuk hozzá, a szavazatokat összegző táblához 
        const voteData = {
            rate_positive: true,
            rate_negative: false,
            user_id: request.currentUser.id,
            picture_id: pictureID[0]
        }
        yield Vote.create(voteData)

        response.redirect('back')       
    }
    
    * downvote (request, response) {
        const name = request.param('name')
        var pictureID = yield Database.from('pictures').where('name', name).pluck('id')
        // ellenőrizzük,hogy szavazott-e már a felhasználó
        // bár a gomb inaktív a kép alatt, de védjük magunkat a kicsi k***i hackerektől :)
       if (yield Vote.findBy('picture_id', pictureID[0])) {
            // ha igen, nézzük meg,hogy mire
            const voted = yield Database.from('pictures').where('name', name).pluck('rate_negative')
            // ha a negatív szavazatot adott korábban is akkor ne csináljunk semmit
            if(voted[0]) {
                response.redirect('back')
                return
            }
            // ha pozitív volt eddig, akkor változtassuk meg a táblában a szavazatot
            yield Database.from('votes').where('picture_id', pictureID[0]).update('rate_positive', false)
            yield Database.from('votes').where('picture_id', pictureID[0]).update('rate_negative', true)
            // csökkentsük a pozitív szavazatokat eggyel
            var picture = yield Database.from('pictures').where('name', name).pluck('rate_positive')
            var num = picture[0] - 1
            yield Database.from('pictures').where('name', name).update('rate_positive', num)
            // növeljük a negatív szavazatot eggyel
            var picture = yield Database.from('pictures').where('name', name).pluck('rate_negative')
            var num = picture[0] + 1
            yield Database.from('pictures').where('name', name).update('rate_negative', num)

            response.redirect('back')
            return            
        }
        // ha még nem szavazott a képre a felhasználó akkor növeljük a negatív szavazatot
        var picture = yield Database.from('pictures').where('name', name).pluck('rate_negative')
        var num = picture[0] + 1
        yield Database.from('pictures').where('name', name).update('rate_negative', num)
        // valamint adjuk hozzá, a szavazatokat összegző táblához 
        const voteData = {
            rate_positive: false,
            rate_negative: true,
            user_id: request.currentUser.id,
            picture_id: pictureID[0]
        }
        yield Vote.create(voteData)

        response.redirect('back')       
    }

}

module.exports = PictureController