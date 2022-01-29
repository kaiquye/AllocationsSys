import { AuthContext } from "../../../contexts/Dahs/painel/index";
import { useContext, useEffect } from "react";
import {Link} from 'react-router-dom'
import Table from "../../../compents/table/index";
import Button from "../../../compents/button";
import Container  from '../../../compents/container/index'
import './Style.css'
function Painel() {
  const { findAllocation, allocations } = useContext(AuthContext);

  useEffect(() => {
    findAllocation();
  }, []);

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
    <Container className='mainAllAlocations'>
      <Container className='infoAllAllocations'>
        <Container>
         <h5>all these allocations are registered in a database</h5>
        </Container>
        <Container className='btnsAlocas'>
            <Button> <Link className="myallocationsAllAllocations" to='/myallocations'>My allocation</Link>
            <Button> <Link  className="myallocationsAllAllocations" to='/newallocation' >Create new allocation </Link> </Button>  
            <Button> <Link className="myallocationsAllAllocations" to='/createproject' >Create new project</Link> </Button> 
            <Button>  <Link className="myallocationsAllAllocations" to='/findallocation'>Find allocations by user</Link> </Button> 
            <Button>  <Link className="myallocationsAllAllocations" to='/findallocation'>Register a maneger</Link> </Button>  </Button> 
        </Container>
      </Container>
      <Container className='buttonAllAllocations' >
      {allocations && <>{listAllocations()}</>}
      </Container>
    </Container>
  );
}

export default Painel;
 