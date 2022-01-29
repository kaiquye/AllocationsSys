import {BrowserRouter as Browser, Routes, Route} from 'react-router-dom'
import {AuthContextProvider as ContextLogin } from '../../contexts/login/logar/index'
import {AuthContextProvider as ContextPainel} from '../../contexts/Dahs/painel/index'
import { AuthContextProvider as ContextMyAllocation } from '../../contexts/Dahs/myallocations'
import { AuthContextProvider as ContextCreateAllocation } from '../../contexts/CreateAllocation'
import { AuthContextProvider as ContextFindAllocaction } from '../../contexts/Dahs/findAllocation'
import { AuthContextProvider as ContextRegisterUser } from '../../contexts/login/register'
import { AuthContextProvider as ContextCreateProject } from '../../contexts/Dahs/createProject'
import Logar from '../../pages/login/logar'
import Register from '../../pages/login/register'
import PrivatePage from '../private'
import Painel from '../../pages/dahsboard/dahs_painel'
import MyAllocations from '../../pages/dahsboard/my_allocations/index'
import Create from '../../pages/dahsboard/create_allocation'
import FindAllocation from '../../../src/pages/dahsboard/findAllocationUser/index'
import CreateProject from '../../pages/dahsboard/create_project'
import NavBar from '../../compents/navBar'
import './Style.css'
function RoutesApp () {


    return(
            <Browser>
                <div className='Main'>
                <NavBar/>
                <ContextLogin>
                        <ContextRegisterUser>
                                 <Routes>
                                    <Route path='/' element={<Logar/>}/>
                                    <Route path='/register' element={<Register/>}/>
                                </Routes>
                        </ContextRegisterUser>
                    <ContextPainel>
                            <Routes>
                                <Route path='/dahs_painel' element={ <PrivatePage redirectTO={'/'}> <Painel/> </PrivatePage> }/>
                            </Routes>
                    </ContextPainel>
                    <ContextMyAllocation>
                            <Routes>
                                <Route path='/myallocations' element={ <PrivatePage redirectTO={'/'}> <MyAllocations/> </PrivatePage> }/>
                            </Routes>
                    </ContextMyAllocation>
                    <ContextCreateAllocation>
                    <ContextFindAllocaction>
                            <Routes>
                                <Route path='/newallocation' element={ <PrivatePage redirectTO={'/'}> <Create/> </PrivatePage> }/>
                                <Route path='/findallocation' element={ <PrivatePage redirectTO={'/'}> <FindAllocation/> </PrivatePage> }/>
                            </Routes>
                    </ContextFindAllocaction>
                    <ContextCreateProject>
                        <Routes>
                            <Route  path='/createproject' element={ <PrivatePage redirectTO={'/'}> <CreateProject/> </PrivatePage>} />
                        </Routes>
                    </ContextCreateProject>
                    </ContextCreateAllocation>
                </ContextLogin>
                <NavBar/>
                </div>
            </Browser>
    )
}
export default RoutesApp