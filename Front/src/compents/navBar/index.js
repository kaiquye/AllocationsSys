
import Container from "../container"
import './Style.css'
import react from 'react'
import { Link }  from 'react-router-dom'
import Ul from "../ul"
function NavBar(){

    return(
        <header>
            <Container className='NavBar'>
                    <Container className='logo'>
                        <h1>#Alocas</h1>
                    </Container>
                    <Container className='list'>
                            <Ul>
                                <li>
                                    <Link  className="Link" to='/myallocations'>My Allocations</Link>
                                </li>
                                <li>
                                    <Link  className="Link" to='/dahs_painel'>All Allocations</Link>
                                </li>
                                <li>
                                    <Link className="Link" to='/newallocation'>Create Allocations</Link>
                                </li>
                                <li>
                                    <Link  className="Link" to='/findallocation'>Find Allocations</Link>
                                </li>
                            </Ul>
                    </Container>
            </Container>
        </header>
        
    )
}

export default NavBar