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
// import Route from '@ioc:Adonis/Core/Auth'
import crypto from 'crypto-js'
import Hash from '@ioc:Adonis/Core/Hash'

Route.get('/', async () => {
  return { hello: 'world' }
})
Route.get('/users', 'UsersController.index')

Route.get('/db', async () => {
  return await Database.from('users').select('*')
})

Route.post('/users/add/:id', async ({params}) => {
    const { id } = params;
    const trx = await Database.transaction()
    try 
    {
      const rtn = await trx
        .insertQuery()
        .table('users')
        .insert({ 
          username: 'testacount' + id ,
          password: await Hash.make('test1') ,
          email: 'like.football.' + id + '@gmail.com'
        })
        
        await trx.commit()
        return {result : rtn }
      } catch (error) {
        await trx.rollback()
        return {error : error }
      }
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