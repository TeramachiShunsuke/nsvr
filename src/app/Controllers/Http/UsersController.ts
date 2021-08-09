// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'
import Database from '@ioc:Adonis/Lucid/Database'
import users from 'App/Models/users'

export default class UsersController {
    index() {
        return { user: 'users'}
    }
    // ユーザ作成
    async create(no:number){
        const trx = await Database.transaction()
        try 
        {
          const rtn = await trx
            .insertQuery()
            .table('users')
            .insert({ 
              id : no,
              username: 'testacount' + no ,
              password: await Hash.make('test1') ,
              email: 'like.football.' + no + '@gmail.com'
            })
            
            await trx.commit()
            
            return rtn
          } catch (error) {
            await trx.rollback()
            return 'create error : ' + error.toString()
          }
    }
    // ユーザ更新
    async update(id:number , username: string ,email: string ){
      try{
        // 存在チェック
        if(await this.isExistUser(id) != true){
          return 'No record'
        }
        const User = await users.query().where('id','=',id)
        User[0].username = username
        User[0].email = email
        return User[0].save()
      }catch(error){
        return 'update error : ' + error.toString()
      }
    }
    // 最終ログイン日更新
    async logindate_update(id:number){
      const trx = await Database.transaction()
      try{
        const rtn = await Database.transaction()
        // 存在チェック
        if(await this.isExistUser(id) != true){
          return 'No record'
        }
        trx.commit()
        return rtn
      }catch(error){
        await trx.rollback()
        return 'login date update error : ' + error.toString()
      }
    }
    
    async isExistUser(id:number){
      try{
        // 存在チェック
        const chk = await Database.from('users').select('*').where('id', '=' , id)
        if(chk.length == 0){
          return false
        }
        return true
      }catch(error){
        return false
      }
    }
}

