'use strict'


const Route = use('Route')

Route.get('/', 'PictureController.index')

Route.get('picture/:name', 'PictureController.show')

Route.get('upload', 'PictureController.upload')
Route.post('upload', 'PictureController.doUpload')

