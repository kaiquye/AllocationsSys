import { AuthContext } from '../../../contexts/Dahs/myallocations/index'
import { useContext, useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import './Style.css'
import Container  from '../../../compents/container/index'
import Button from '../../../compents/button'
import Table from "../../../compents/table/index";
function MyAllocations() {
  const { findMyallocations, allocations ,counter, AllocationDel } = useContext(AuthContext);


  useEffect(() => {
    findMyallocations();
  }, []);


  const listAllocations = function () {
    
    return  <Container>
      <Table>
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
                              <td>{allocation.start_time}</td>
                              <Button onClick={()=>{
                                AllocationDel(allocation.id)
                              }}>Delete</Button>
                          </tr>
                      )
                      )
                  }
              </Table>
    </Container>
  };

  return (
    <Container>
      <h1>My allocations</h1>
      {allocations && <>{listAllocations()}</>}
      <Button> <Link to='/dahs_painel' >New</Link> </Button>
    </Container>
  );
}

export default MyAllocations;
