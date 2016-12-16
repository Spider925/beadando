'use strict'

const User = use('App/Model/User')
const Validator = use('Validator')
const Hash = use('Hash')

class UserController {

    * register (request, response) {
        yield response.sendView('register')
    }

    * doregister (request, response) {
        const regData = request.except('_csrf');


        const rules = {
            username: 'required|alpha_numeric|unique:users',
            email: 'required|email|unique:users',
            password: 'required|min:4',
            password_confirm: 'required|same:password'
        }

        const validation = yield Validator.validateAll(regData, rules);
        if (validation.fails()) {
            yield request
                    .withAll()
                    .andWith({ errors: validation.messages() })
                    .flash()
            response.redirect('back')
            return
        }

        const user = new User();

        user.username = regData.username;
        user.email = regData.email;
        user.password = yield Hash.make(regData.password);

        yield user.save()

        yield request.auth.login(user)

        response.redirect('/')
    }

    * login (request, response) {
        yield response.sendView('login')
    }

    * dologin (request, response) {
        const username = request.input('username')
        const password = request.input('password')

        try {
        const login = yield request.auth.attempt(username, password)

            if (login) {
                response.redirect('/')
                return
            }
        }
        catch (err) {
            yield request  
                .withAll()
                .andWith( { errors : [err] })
                .flash()

            response.redirect('back')
            return
        }
    }

    * ajaxLogin (request, response) {
        const username = request.input('username')
        const password = request.input('password')

    try {
      const login = yield request.auth.attempt(username, password) 

      if (login) {
        response.ok({ success: true })
        return
      }
    }
    catch (err) {
      response.ok({ success: false })
      return
    }
    }

    * doLogout (request, response) {
        yield request.auth.logout()
        response.redirect('back')
    }
}

module.exports = UserController