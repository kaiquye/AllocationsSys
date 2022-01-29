import {createContext, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../../../api/index'

export const AuthContext = createContext()

export function AuthContextProvider({children}){
    
    const Navigate = useNavigate()
    const [name, setName] = useState()
    const [description, setDescriptions] = useState()
    const [manager, setManager] = useState()
    const [number, setNumber] = useState()

    function Create(e){
        console.log('length')
        e.preventDefault()
        if(name == null || name.length <= 3){
            return alert('invalid name')
        }
        if(description == null || description.length <= 10){
            return alert('Invalid description')
        }
        if(manager == null || manager.length <= 4){
            return alert('Invalid manager')
        }
        axios.post('project', {
            name : name, 
            description: description, 
            manager : manager,
            number : number
        },{
            headers : {
                'Authorization' : localStorage.getItem('Token')
            }
         }
       ).then((resp)=>{
           console.log(resp)
           if(resp.data.success === false){
               alert('Erro ao criar projecto')
               return document.location.reload()
           }else if(resp.data.success === true){
               alert('Projecto criado com sucesso')
               return Navigate('/dahs_painel')
           }
            console.log(resp)
        }).catch((erro)=>{
            console.log(erro)
        })
    }

    return(
        <AuthContext.Provider value={{setName,setManager, setDescriptions, Create, setNumber}}>
            {children}
        </AuthContext.Provider>
    )
}