import {Link} from 'react-router-dom'
import Table from "../../../compents/table/index";
import Button from "../../../compents/button";
import {AuthContext} from '../../../contexts/Dahs/findAllocation'
import { AuthContext as ContextCreateAllocation} from '../../../contexts/CreateAllocation';
import Container  from '../../../compents/container/index'
import {useContext, useEffect} from 'react'
function FindAllocation() {

    const {users,finduser, setIduser,allocations, findAllocation} = useContext(AuthContext)

        useEffect(()=>{
            finduser()
        },[])

  const listAllocations = function () {
    return <Table>

      
        <tr>
            <th>Titles</th><th>descriptions</th><th>fistname</th><th>maneger</th><th>name</th><th>number</th><th>start</th><th>end</th>
        </tr>
            {
                allocations.map((allocation)=>(
                    <tr>
                        <td>{allocation.title}</td>
                        <td>{allocation.descriptions}</td>
                        <td>{allocation.fistname}</td>
                        <td>{allocation.maneger_project}</td>
                        <td>{allocation.name_project}</td>
                        <td>{allocation.number_project}</td>
                        <td>{allocation.start_date}</td>
                        <td>{allocation.end_date}</td> 
                    </tr>
                )
                )
            }
        </Table>;
  };

  return (
    <Container>
      <select onClick={(e)=>findAllocation(e.target.value)} onChange={(e)=>{
                console.log(e.target.value)
                setIduser(e.target.value) 
            }}>
                <option value='0' >Select a option</option>
                {users &&
                users.map((user)=>(
                   <option value={user.id}>{user.fistname}</option>
                ))
                }
            </select>
      <h1>Find allocations</h1>
      {allocations && <>{listAllocations()}</>}
      <Button><Link to='/dahs_painel' >return</Link></Button>
    </Container>
  );
}

export default FindAllocation;
