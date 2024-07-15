import {db} from '@/lib/db';
import exp from 'constants';

export const getUserByEmail = async (email:string) => {
    try {
        const user = await db.user.findUnique({
            where:{
                email
            }
        })


       // if(!user) console.log('User not found')

        //console.log(user)
        return user

    } catch (error) {
        console.log(error)
        return null
        
    }
}



export const getUserById = async (id:string) => {
try {
        const user = await db.user.findUnique({
            where:{
                id
            }
        })
        return user

    } catch (error) {
        return null
    }
}



