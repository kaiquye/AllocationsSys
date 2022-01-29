import {useContext} from 'react'
import {AuthContext} from '../../../contexts/Dahs/createProject/index'
import Form from '../../../compents/form'
import Label from '../../../compents/label'
import Button from '../../../compents/button'
import Input from '../../../compents/input'
import Container  from '../../../compents/container/index'
function CreateProject(){
    const {setName, setDescriptions, setManager, Create, setNumber} = useContext(AuthContext)
    return(
        <Container>   
            <Form onSubmit={Create} >
                <Label>Name : </Label>
                <Input type='text' onChange={setName}/>
                <Label>Description : </Label>
                <Input type='text' onChange={setDescriptions} />
                <Label>Manager : </Label>
                <Input type='text' onChange={setManager} />
                <Label>Number : </Label>
                <Input type='number' onChange={setNumber} />
                <Button>Next</Button>
            </Form>
        </Container>
    )
}

export default CreateProject