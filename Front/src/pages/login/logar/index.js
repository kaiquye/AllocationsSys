import Form from '../../../compents/form'
import Input from '../../../compents/input'
import Button from '../../../compents/button'
import Label from '../../../compents/label'
import Container from '../../../compents/container'
import axios from '../../../api'
import { useEffect, useContext} from 'react'
import { Link } from 'react-router-dom'
import {AuthContext} from '../../../contexts/login/logar/index'

function Logar (){
    const {setEmail, setPassword, authentication  ,alertMensagem, checkAuthorization} = useContext(AuthContext)
  
    return(
        <Container>
            {alertMensagem &&
                    (
                        <>
                            <Label>{alertMensagem}</Label>
                        </>
                    )
                }
            <Form onSubmit={checkAuthorization} >
                <Label>Email : </Label>
                <Input  onChange={setEmail} type={'email'} />
                <Label>Password : </Label>
                <Input  onChange={setPassword} type={'password'} />
                <Button>login</Button>
            </Form>
             <Link to={'/register'}> register </Link> 
        </Container>
    )
}
export default Logar