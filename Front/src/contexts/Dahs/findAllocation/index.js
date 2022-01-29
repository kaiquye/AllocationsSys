import {createContext, useContext, useState, useEffect} from 'react'
import { AuthContext as ContextLogin } from '../../login/logar'
import axios from '../../../api/index'

export const AuthContext = createContext()


export function AuthContextProvider ({children}){
    const {logUser} = useContext(ContextLogin)
    const [allocations, setAllocations] = useState()
    const [iduser, setIduser]=useState()
    const [users, setUsers] = useState()



    const finduser = function(){
        axios.get('/users', {
            headers : {
                'Authorization' : localStorage.getItem('Token')
            }
        }).then((resp)=>{
            console.log(resp)
            setUsers(resp.data.result.users)
        }).catch((err)=>console.log(err))
    }

    const findAllocation = function(idusers){
        if(idusers > 0){
            axios.get('allocation/'+idusers+'',{
                    headers: {
                        'Authorization' : localStorage.getItem('Token')
                    }
            }).then((resp)=>{
                console.log(resp.data)
                setAllocations(resp.data.result)
            }).catch((err)=>console.log(err))
        }
    }
 

    return(

        <AuthContext.Provider value={{users,finduser, setIduser,allocations, findAllocation}}>
            {children}
        </AuthContext.Provider>

    )
}