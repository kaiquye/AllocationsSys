import {createContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../../../../src/api/index'

export const AuthContext = createContext();


export function AuthContextProvider({children}){
    const Navigate = useNavigate()
    const [logUser, setLogUser] = useState(false)
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [alertMensagem, setAlertMensagem] = useState(null)

    const Login = function(params){
        if(params){
            setLogUser(params)
        }
    }
    let teste = 'treste'
   const checkAuthorization = function(event){
    event.preventDefault();
    if(email == null || email === ' '){
       return setAlertMensagem('e-mail invalid')
    }
    if(password == null || password === ' '){
        return setAlertMensagem('password invalid')
    }
        axios.post('users/login', {
            email : email,
            password : password
        }).then((resp)=>{
            console.log(resp)
            if(resp.data.success === false){
                alert('Erro, nenhum usuario encontrado')
                return document.location.reload()
            }
            localStorage.setItem('Token',resp.data.Token)
        
            Login(resp.data.user.userID);
           return Navigate('/dahs_painel')
        }).catch((erro)=>{  
            console.log(erro)
        })
   }
    return(
        <AuthContext.Provider value={{checkAuthorization, authentication : Boolean(logUser), teste, logUser, alertMensagem, setEmail, setPassword}}>
            {children}
        </AuthContext.Provider>
    )
} 

