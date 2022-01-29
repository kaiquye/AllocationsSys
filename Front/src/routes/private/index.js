import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import {AuthContext} from '../../../src/contexts/login/logar/index'

function PrivatePage({children, redirectTO}){

    const {authentication} = useContext(AuthContext)
    if(authentication){
        return children
    }else{
        //Use o Navigate no logar do useNavigate
        alert('Usuario deslogado')
        return <Navigate to={redirectTO}/>
    }
  
}

export default PrivatePage