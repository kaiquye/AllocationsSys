import { createContext, useEffect, useState } from "react";
import axios from '../../../api/index'
export const AuthContext = createContext()

export function AuthContextProvider ({children}){


   const [allocations, setAllocations] = useState([])
   async function findAllocation(){
       await axios.get('allocation/',{
                headers: {
                    'Authorization' : localStorage.getItem('Token')
                }
            })
            .then((resp)=>{
                console.log(resp)
                setAllocations(resp.data.result.allocations);
            }).catch((erro)=>{
                console.log(erro)
            })
    }

 

    return(
        <AuthContext.Provider value={{findAllocation, allocations}}>
            {children}
        </AuthContext.Provider>
    )
}