import {createContext, useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from '../../../api/index'

export const AuthContext = createContext()

export function AuthContextProvider ({children}){

    const Navigate = useNavigate()
    const [fistname, setFistname] = useState()
    const [lastname, setLastname] = useState()
    const [password, setPassword] = useState()
    const [email, setEmail] = useState()

    const RegisterUser = function(e){
        console.log(fistname)
        e.preventDefault()
        if(fistname == null || fistname <= 2){
            alert('fistname invalid')
        }else if(lastname == null || lastname.length <= 2){
            alert('lastname invalid')
        }else if(password == null || password.length <= 5){
            alert('password invalid')
        }else if(email == null || password.length <=5){
            alert('email invalid')
        }else {
            axios.post('users/register', {
                    fistname : fistname,
                    lastname : lastname,
                    password : password, 
                    email : email
            }).then((resp)=> {
                console.log(resp)
                if(resp.data.success === false && resp.data.status === 406){
                    alert('Email ou login ja em uso')
                    return  document.location.reload()
                }else if(resp.data.success === true){
                    alert('Usuario criado com sucesso')
                    return Navigate('/')
                }
            }).catch((err)=>{
                alert('aconteceu um erro inesperado')
                console.log(err)
            })
        }
    }
    return(
        <AuthContext.Provider value={{setFistname, setLastname, setPassword, setEmail, RegisterUser}}>
            {children}
        </AuthContext.Provider>
    )
}