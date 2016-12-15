'use strict'


const Route = use('Route')

Route.get('/', 'PictureController.index')

Route.get('picture/:name', 'PictureController.show')
Route.get('category/:id', 'PictureController.categoryShow')
Route.get('uploads', 'PictureController.userpicturesShow')

Route.get('picture/:name/upvote', 'PictureController.upvote')
Route.get('picture/:name/downvote', 'PictureController.downvote')

Route.get('upload', 'PictureController.upload')
Route.post('upload', 'PictureController.doUpload')

Route.get('picture/:name/delete', 'PictureController.delete')


Route.get('/register', 'UserController.register')
Route.post('/register', 'UserController.doregister')

Route.get('/login', 'UserController.login')
Route.post('/login', 'UserController.dologin')

Route.get('/logout', 'UserController.doLogout')

Route.group('ajax', function () {
  Route.delete('/picture/:name/delete', 'PictureController.ajaxDelete').middleware('auth')
}).prefix('/ajax')