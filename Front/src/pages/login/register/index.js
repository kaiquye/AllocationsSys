import Form from '../../../compents/form/index'
import Button from '../../../compents/button'
import Input from '../../../compents/input'
import Label from '../../../compents/label'
import {useContext} from 'react'
import {AuthContext} from '../../../contexts/login/register/index'
import Container  from '../../../compents/container/index'

function Register(){

    const {setFistname, setLastname, setPassword, setEmail, RegisterUser} = useContext(AuthContext)

    return(
        <Container>
            <Form onSubmit={RegisterUser}>
                <Label>FistName</Label>
                <Input type='text' onChange={setFistname} />
                <Label>LastName</Label>
                <Input type='text' onChange={setLastname} />
                <Label>Password</Label>
                <Input type='password' onChange={setPassword} />
                <Label>E-mail</Label>
                <Input type='email' onChange={setEmail} />
                <Button>register</Button>
            </Form>
        </Container>
    )
}

export default Register