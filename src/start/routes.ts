/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/
import Database from '@ioc:Adonis/Lucid/Database'
import Route from '@ioc:Adonis/Core/Route'
import crypto from 'crypto-js'
import UsersController from 'App/Controllers/Http/UsersController'

Route.get('/', async () => {
  return { hello: 'world' }
})
Route.get('/users', 'UsersController.index')

Route.get('/db', async () => {
  return await Database.from('users').select('*')
})

Route.post('/users/add/:id', async ({params}) => {
    const { id } = params;
    const uct = new UsersController()
    const rtn = await uct.create(id)
    return {result : rtn }
})

Route.post('/users/update', async ({request}) => {
  const id = request.input('id')
  const username = request.input('username')
  const email = request.input('email')
  const uct = new UsersController()
  const rtn = await uct.update(id,username,email)
  return {result : rtn }
})



Route.post('login', async ({ auth, request, response }) => {
  const email = request.input('email')
  var password = crypto.AES.decrypt(request.input('password'), '123').toString(crypto.enc.Utf8)
  try {
    const token = await auth.use('api').attempt(email, password)
    return token
  } catch(error) {
    // return response.badRequest('Invalid credentials')
    return response.badRequest(request.input('password'))
  }
})