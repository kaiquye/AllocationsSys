import {useContext, useEffect, useState} from 'react'
import {AuthContext} from '../../../contexts/CreateAllocation/index'
import Form from '../../../compents/form'
import Input from '../../../compents/input'
import Label from '../../../compents/label'
import Button from '../../../compents/button'
import Container  from '../../../compents/container/index'

function Create(){
    const {findProject, projects, setIdproject, setTitle, setDescriptions, setStart_date, 
        setEnd_date, setStart_time, setEnd_time, createAllocation} = useContext(AuthContext)

    useEffect(()=>{
        findProject()
    },[])

    return(
        <Container>
            <select  onChange={(e)=>{
                console.log(e.target.value)
                setIdproject(e.target.value) 
            }} >
                <option value='0' >Select a option</option>
                {projects &&
                projects.map((project)=>(
                   <option value={project.id}>{project.name_project}</option>
                ))
                }
            </select>
            <Form onSubmit={createAllocation} >
                <Label>Title</Label>
                <Input type={'data'} onChange={setTitle} />
                <Label>descriptions</Label>
                <Input type={'text'}  onChange={setDescriptions} />
                <Label>start-teste</Label>
                <Input type={'text'}  onChange={setStart_date} />
                 <Label>End</Label>
                <Input type={'text'} onChange={setEnd_date} />
                <Label>Start</Label>
                <Input type={'text'} onChange={setStart_time} />
                <Label>End</Label>
                <Input type={'text'} onChange={setEnd_time} />
                <Button>next</Button>
            </Form>
        </Container>
    )
}
export default Create