import {createContext, useState, useContext, useEffect} from 'react'
import { AuthContext as ContextLogin } from '../../login/logar'
import axios from '../../../api/index'
export const AuthContext = createContext()

export function AuthContextProvider({children}){


    const [allocations, setAllocations] = useState()
      const [counter, setCounter] = useState(1)
    const {logUser} = useContext(ContextLogin)

   async function AllocationDel(params){
        console.log(params)
        axios.delete('allocation/'+params+'', {
            headers: {
                'Authorization' : localStorage.getItem('Token')
            }
        }).then((resp)=>{ 
            console.log(resp)
            if(resp.data.success === true){
                alert('Allocation delete')
                findMyallocations()
            }  
        }).catch((erro)=>console.log(erro))
        
    }

    async function findMyallocations(){
        await axios.get('allocation/'+logUser+'',{
                 headers: {
                     'Authorization' : localStorage.getItem('Token')
                 }
             })
             .then((resp)=>{
                 console.log(resp)
               setAllocations(resp.data.result);
             }).catch((erro)=>{
                 console.log(erro)
             })
     }

    return(
        <AuthContext.Provider value={{allocations, AllocationDel, counter, findMyallocations}}>
            {children}
        </AuthContext.Provider>
    )
}