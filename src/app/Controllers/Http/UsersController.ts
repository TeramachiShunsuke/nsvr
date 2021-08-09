// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'
import Database from "@ioc:Adonis/Lucid/Database"

export default class UsersController {
    index() {
        return { user: 'users'}
    }
    async create(no:number){
        const trx = await Database.transaction()
        try 
        {
          const rtn = await trx
            .insertQuery()
            .table('users')
            .insert({ 
              username: 'testacount' + no ,
              password: await Hash.make('test1') ,
              email: 'like.football.17@gmail.com'
            })
            
            await trx.commit()
            
            return rtn;
          } catch (error) {
            await trx.rollback()
            return 'no result'
          }
    }

}

